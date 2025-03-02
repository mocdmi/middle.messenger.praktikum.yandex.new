import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface SignInFormProps {
    formState: {
        email: string;
        login: string;
        first_name: string;
        second_name: string;
        phone: string;
        password: string;
        confirm_password: string;
    };
}

export default class SignInForm extends Block<SignInFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    email: '',
                    login: '',
                    first_name: '',
                    second_name: '',
                    phone: '',
                    password: '',
                    confirm_password: '',
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
                EmailInput: new LabelInput({
                    name: 'email',
                    value: '',
                    type: 'email',
                    label: 'Почта',
                    'theme-default': true,
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                email: el.value,
                            },
                        });
                    },
                }) as Block,
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
                FirstNameInput: new LabelInput({
                    'theme-default': true,
                    name: 'first_name',
                    value: '',
                    type: 'text',
                    label: 'Имя',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                first_name: el.value,
                            },
                        });
                    },
                }) as Block,
                SecondNameInput: new LabelInput({
                    'theme-default': true,
                    name: 'second_name',
                    value: '',
                    type: 'text',
                    label: 'Фамилия',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                second_name: el.value,
                            },
                        });
                    },
                }) as Block,
                PhoneInput: new LabelInput({
                    'theme-default': true,
                    name: 'phone',
                    value: '',
                    type: 'text',
                    label: 'Телефон',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                phone: el.value,
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
                ConfirmPasswordInput: new LabelInput({
                    'theme-default': true,
                    name: 'confirm_password',
                    value: '',
                    type: 'password',
                    label: 'Пароль (ещё раз)',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                confirm_password: el.value,
                            },
                        });
                    },
                }) as Block,
                SignInButton: new Button({
                    'theme-default': true,
                    label: 'Зарегистрироваться',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.field}">
                {{{EmailInput}}}
            </div>
            <div class="${styles.field}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.field}">
                {{{FirstNameInput}}}
            </div>
            <div class="${styles.field}">
                {{{SecondNameInput}}}
            </div>
            <div class="${styles.field}">
                {{{PhoneInput}}}
            </div>
            <div class="${styles.field}">
                {{{PasswordInput}}}
            </div>
            <div class="${styles.field}">
                {{{ConfirmPasswordInput}}}
            </div>
            <div class="${styles.submit}">
                {{{SignInButton}}}
            </div>
        `;
    }
}
