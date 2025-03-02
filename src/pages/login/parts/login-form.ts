import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface LoginFormProps {
    formState: {
        login: string;
        password: string;
    };
}

export default class LoginForm extends Block<LoginFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    login: '',
                    password: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        const el = e.target as HTMLFormElement;
                        console.log(this.props.formState);
                        el.reset();
                    },
                },
            },
            {
                LoginInput: new LabelInput({
                    'theme-default': true,
                    name: 'login',
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                login: el.value,
                            },
                        });
                    },
                }) as Block,
                PasswordInput: new LabelInput({
                    'theme-default': true,
                    name: 'password',
                    value: '',
                    type: 'password',
                    label: 'Пароль',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                password: el.value,
                            },
                        });
                    },
                }) as Block,
                LoginButton: new Button({
                    'theme-default': true,
                    label: 'Авторизоваться',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.field}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.field}">
                {{{PasswordInput}}}
            </div>
            <div class="${styles.submit}">
                {{{LoginButton}}}
            </div>
        `;
    }
}
