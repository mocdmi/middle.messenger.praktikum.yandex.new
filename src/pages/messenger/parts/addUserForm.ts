import { BaseForm } from '@core';
import { isErrorsEmpty } from '@helpers';
import styles from '../styles.module.css';
import { InputKey, UserActionFormProps, UserActionProps } from './types';

const formConfig = {
    formFields: {
        login: {
            component: 'LoginInput',
            label: 'Логин',
            type: 'text',
        },
    },
    validators: {
        login: () => '',
    },
} as const;

export default class AddUserForm extends BaseForm<UserActionFormProps, InputKey> {
    constructor(props: UserActionProps) {
        const initialProps: UserActionFormProps = {
            form: {
                login: {
                    value: '',
                    error: '',
                },
            },
        };

        super(
            {
                ...props,
                ...initialProps,
            },
            formConfig,
            { label: 'Добавить' },
        );
    }

    async onSubmit(e: Event, errors: Record<string, string>) {
        if (isErrorsEmpty(errors)) {
            const userId = this.props.form.login.value;
            this.props.onSubmit?.(Number(userId));
            (e.target as HTMLFormElement).reset();
        }
    }

    // language=Handlebars
    render(): string {
        return `
            ${Object.values(formConfig.formFields)
                .map(
                    ({ component }) => `
                    <div class="${styles.actionField}">
                        {{{${component}}}}
                    </div>
                `,
                )
                .join('')}
            {{#if isError}}
                <div class="${styles.error}">
                    {{isError}}
                </div>
            {{/if}}
            <div class="${styles.actionSubmit}">
                {{{SubmitButton}}}
            </div>
        `;
    }
}
