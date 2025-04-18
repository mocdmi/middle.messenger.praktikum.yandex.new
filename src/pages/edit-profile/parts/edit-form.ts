import { Button, LabelInput } from '../../../components';
import { profileContext } from '../../../context';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import Validator from '../../../core/validator';
import { isErrorsEmpty, validateOnSubmit } from '../../../helpers';
import styles from '../styles.module.css';

interface EditFormProps extends ProfileContext {
    formState: {
        email: string;
        login: string;
        first_name: string;
        second_name: string;
        display_name: string;
        phone: string;
    };
    errors: {
        email: string;
        login: string;
        firstName: string;
        secondName: string;
        display_name: string;
        phone: string;
    };
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isEmail(),
    (value: string) => Validator.validate(value).isLogin(),
    (value: string) => Validator.validate(value).isName(),
    (value: string) => Validator.validate(value).isName(),
    () => '',
    (value: string) => Validator.validate(value).isPhone(),
];

const inputValues: Record<string, string> = {};
profileContext.detail.map((input) => (inputValues[input.name] = input.value));

export default class EditForm extends Block<EditFormProps> {
    constructor(props: ProfileContext) {
        super(
            'form',
            {
                ...props,
                formState: {
                    email: inputValues.email,
                    login: inputValues.login,
                    first_name: inputValues.first_name,
                    second_name: inputValues.second_name,
                    display_name: inputValues.display_name,
                    phone: inputValues.phone,
                },
                errors: {
                    email: '',
                    login: '',
                    firstName: '',
                    secondName: '',
                    display_name: '',
                    phone: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();
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
                        }
                    },
                },
            },
            {
                EmailInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: 'email',
                    value: inputValues.email,
                    type: 'email',
                    label: '',
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
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: 'login',
                    value: inputValues.login,
                    type: 'text',
                    label: '',
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
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: 'first_name',
                    value: inputValues.first_name,
                    type: 'text',
                    label: '',
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
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: 'second_name',
                    value: inputValues.second_name,
                    type: 'text',
                    label: '',
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
                ChatNameInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: 'display_name',
                    value: inputValues.display_name,
                    type: 'text',
                    label: '',
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                display_name: el.value,
                            },
                        });
                    },
                }) as Block,
                PhoneInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: 'phone',
                    value: inputValues.phone,
                    type: 'text',
                    label: '',
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
                SendButton: new Button({
                    'theme-default': true,
                    type: 'submit',
                    label: 'Сохранить',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                <div class="${styles.row}">
                    <div class="${styles.label}">Почта</div>
                    <div class="${styles.value}">
                        {{{EmailInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Логин</div>
                    <div class="${styles.value}">
                        {{{LoginInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Имя</div>
                    <div class="${styles.value}">
                        {{{FirstNameInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Фамилия</div>
                    <div class="${styles.value}">
                        {{{SecondNameInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Имя в чате</div>
                    <div class="${styles.value}">
                        {{{ChatNameInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Телефон</div>
                    <div class="${styles.value}">
                        {{{PhoneInput}}}
                    </div>
                </div>
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
