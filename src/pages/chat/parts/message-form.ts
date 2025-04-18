import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import Validator from '../../../core/validator';
import { isErrorsEmpty, validateOnSubmit } from '../../../helpers';
import styles from '../styles.module.css';

interface MessageFormProps {
    formState: {
        message: string;
    };
    errors: {
        message: string;
    };
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isRequired(),
];

export default class MessageForm extends Block<MessageFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    message: '',
                },
                errors: {
                    message: '',
                },
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
                            console.log(this.props.formState);
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
                        const input = this.children.MessageInput as LabelInput;
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
