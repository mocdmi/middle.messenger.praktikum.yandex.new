import { Button, LabelInput } from '../../../components';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import Validator from '../../../core/validator';
import { isErrorsEmpty, validateOnSubmit } from '../../../helpers';
import styles from '../styles.module.css';

interface EditFormProps extends ProfileContext {
    formState: {
        oldPassword: string;
        newPassword: string;
        newPasswordConfirm: string;
    };
    errors: {
        oldPassword: string;
        newPassword: string;
        newPasswordConfirm: string;
    };
}

const validators: ((value: string) => string)[] = [
    (value: string) => Validator.validate(value).isPassword(),
    (value: string) => Validator.validate(value).isPassword(),
    (value: string) => Validator.validate(value).isPassword(),
];

export default class EditForm extends Block<EditFormProps> {
    constructor(props: ProfileContext) {
        super(
            'form',
            {
                ...props,
                formState: {
                    oldPassword: props.password,
                    newPassword: '',
                    newPasswordConfirm: '',
                },
                errors: {
                    oldPassword: '',
                    newPassword: '',
                    newPasswordConfirm: '',
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
                OldPasswordInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'oldPassword',
                    value: props.password,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                oldPassword: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.OldPasswordInput as LabelInput;
                        const error = Validator.validate(el.value).isPassword();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                oldPassword: error,
                            },
                        });
                    },
                }) as Block,
                NewPasswordInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'newPassword',
                    value: '',
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                newPassword: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.NewPasswordInput as LabelInput;
                        const error = Validator.validate(el.value).isPassword();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                newPassword: error,
                            },
                        });
                    },
                }) as Block,
                NewPasswordConfirmInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'newPasswordConfirm',
                    value: '',
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                newPasswordConfirm: el.value,
                            },
                        });
                    },
                    onBlur: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        const input = this.children.NewPasswordConfirmInput as LabelInput;
                        const error = Validator.validate(el.value).isPassword();

                        input.setProps({ ...input.props, error: error });

                        this.setProps({
                            ...this.props,
                            errors: {
                                ...this.props.errors,
                                newPasswordConfirm: error,
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
                    <div class="${styles.label}">Старый пароль</div>
                    <div class="${styles.value}">
                        {{{OldPasswordInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Новый пароль</div>
                    <div class="${styles.value}">
                        {{{NewPasswordInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Повторите новый пароль</div>
                    <div class="${styles.value}">
                        {{{NewPasswordConfirmInput}}}
                    </div>
                </div>
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
