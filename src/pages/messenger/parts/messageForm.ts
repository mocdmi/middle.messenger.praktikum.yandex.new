import { Button, LabelInput } from '@components';
import { Block, Validator, WebSocketClient } from '@core';
import { connect, isErrorsEmpty, validateOnSubmit } from '@helpers';
import { ChatsService } from '@services';
import { AppStore } from '@types';
import styles from '../styles.module.css';

interface MessageFormProps {
    formState?: {
        message: string;
    };
    errors?: {
        message: string;
    };
    chatId?: number;
    userId?: number;
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isRequired(),
];

class MessageForm extends Block<MessageFormProps> {
    private readonly chatsService = new ChatsService();
    private wsClient: WebSocketClient | null = null;

    constructor() {
        super(
            'form',
            {
                className: styles.message,
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        const el = e.target as HTMLFormElement;

                        validateOnSubmit(
                            validators,
                            this.props.formState,
                            this.props.errors,
                            this.children,
                            (name: string, error: string) => {
                                this.setProps({
                                    ...this.props,
                                    errors: {
                                        ...this.props.errors,
                                        [name]: error,
                                    },
                                });
                            },
                        );

                        if (isErrorsEmpty(this.props.errors)) {
                            this.wsClient?.send('message', this.props.formState?.message);
                            el.reset();
                        }
                    },
                },
            },
            {
                MessageInput: new LabelInput({
                    'theme-color': true,
                    type: 'text',
                    name: 'message',
                    placeholder: 'Сообщение',
                    rounded: true,
                    value: '',
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                message: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.MessageInput as unknown as LabelInput;
                        const error = Validator.validate(el.value).isRequired();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                message: error,
                            },
                        });
                    },
                }) as Block,
                SendButton: new Button({
                    'theme-default': true,
                    type: 'submit',
                    rounded: true,
                    icon: 'next',
                }) as Block,
            },
        );
    }

    initWebsockets = async () => {
        if (!this.props.chatId) {
            throw new Error('Chat not found');
        }

        if (!this.props.userId) {
            throw new Error('User not found');
        }

        const token = await this.chatsService.getChatToken(this.props.chatId);

        this.wsClient = new WebSocketClient(
            `/chats/${this.props.userId}/${this.props.chatId}/${token}`,
        );

        this.wsClient.connect();

        this.wsClient.subscribe('message', (message) => {
            console.log('New message: ', message);
        });

        this.wsClient.subscribe('error', (error) => {
            console.error('WebSocket error: ', error);
        });
    };

    componentDidUpdate(oldProps: MessageFormProps, newProps: MessageFormProps): boolean {
        if (oldProps.chatId !== newProps.chatId) {
            this.initWebsockets();
            return true;
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.input}">
                {{{MessageInput}}}
            </div>
            {{{SendButton}}}
        `;
    }
}

function mapStateToProps(state: AppStore): MessageFormProps {
    return {
        formState: {
            message: '',
        },
        errors: {
            message: '',
        },
        chatId: state.selectedChat.chat?.id,
        userId: state.user.user?.id,
    };
}

export default connect(mapStateToProps)(MessageForm);
