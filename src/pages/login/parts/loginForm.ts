import { BaseForm, Validator } from '@core';
import { isErrorsEmpty } from '@helpers';
import { AuthService } from '@services';
import styles from '../styles.module.css';
import { LoginFormProps, InputKey } from '../types';

const formConfig = {
    formFields: {
        login: {
            component: 'LoginInput',
            label: 'Логин',
            type: 'text',
            autocomplete: 'username',
        },
        password: {
            component: 'PasswordInput',
            label: 'Пароль',
            type: 'password',
            autocomplete: 'current-password',
        },
    },
    validators: {
        login: (value: string) => Validator.validate((value ?? '') as string).isLogin(),
        password: (value: string) => Validator.validate((value ?? '') as string).isPassword(),
    },
} as const;

export default class LoginForm extends BaseForm<LoginFormProps, InputKey> {
    private readonly authService = new AuthService();

    constructor() {
        const initialProps: LoginFormProps = {
            form: {
                login: {
                    value: '',
                    error: '',
                },
                password: {
                    value: '',
                    error: '',
                },
            },
        };

        super(initialProps, formConfig, { label: 'Авторизоваться' });
    }

    async onSubmit(_e: Event, errors: Record<string, string>): Promise<void> {
        if (isErrorsEmpty(errors)) {
            const formData = {
                login: this.props.form.login.value,
                password: this.props.form.password.value,
            };
            await this.authService.login(formData);
        }
    }

    // language=Handlebars
    render(): string {
        return `
            ${Object.values(formConfig.formFields)
                .map(
                    (field) => `
                        <div class="${styles.field}">
                            {{{${field.component}}}}
                        </div>
                    `,
                )
                .join('')}
            <div class="${styles.submit}">
                {{{SubmitButton}}}
            </div>
        `;
    }
}
