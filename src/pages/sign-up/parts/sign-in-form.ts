import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import Validator from '../../../core/validator';
import { isErrorsEmpty, validateOnSubmit } from '../../../helpers';
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
    errors: {
        email: string;
        login: string;
        firstName: string;
        secondName: string;
        phone: string;
        password: string;
        confirmPassword: string;
    };
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isEmail(),
    (value: string) => Validator.validate(value).isLogin(),
    (value: string) => Validator.validate(value).isName(),
    (value: string) => Validator.validate(value).isName(),
    (value: string) => Validator.validate(value).isPhone(),
    (value: string) => Validator.validate(value).isPassword(),
    (value: string) => Validator.validate(value).isPassword(),
];

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
                errors: {
                    email: '',
                    login: '',
                    firstName: '',
                    secondName: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
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
                EmailInput: new LabelInput({
                    name: 'email',
                    value: '',
                    type: 'email',
                    label: 'Почта',
                    'theme-default': true,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.EmailInput as LabelInput;
                        const error = Validator.validate(el.value).isEmail();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                email: error,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.LoginInput as LabelInput;
                        const error = Validator.validate(el.value).isLogin();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                login: error,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.FirstNameInput as LabelInput;
                        const error = Validator.validate(el.value).isName();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                firstName: error,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.SecondNameInput as LabelInput;
                        const error = Validator.validate(el.value).isName();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                secondName: error,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.PhoneInput as LabelInput;
                        const error = Validator.validate(el.value).isPhone();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                phone: error,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.PasswordInput as LabelInput;
                        const error = Validator.validate(el.value).isPassword();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                password: error,
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
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.ConfirmPasswordInput as LabelInput;
                        const error = Validator.validate(el.value).isPassword();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                confirmPassword: error,
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
