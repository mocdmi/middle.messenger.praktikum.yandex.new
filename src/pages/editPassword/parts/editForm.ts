import { Button, LabelInput } from '@components';
import { Block, Validator } from '@core';
import { isErrorsEmpty } from '@helpers';
import styles from '../styles.module.css';
import { EditPasswordProps, InputKey } from '../types';
import { PasswordUpdateRequestDto } from '@api';

const validators: Record<InputKey, (value: unknown) => string> = {
    oldPassword: (value: unknown) => Validator.validate((value ?? '') as string).isPassword(),
    newPassword: (value: unknown) => Validator.validate((value ?? '') as string).isPassword(),
    newPasswordConfirm: (value: unknown) =>
        Validator.validate((value ?? '') as string).isPassword(),
};

const formFieldsMap = {
    oldPassword: {
        component: 'OldPasswordInput',
        label: 'Старый пароль',
        autocomplete: 'current-password',
    },
    newPassword: {
        component: 'NewPasswordInput',
        label: 'Новый пароль',
        autocomplete: 'new-password',
    },
    newPasswordConfirm: {
        component: 'NewPasswordConfirmInput',
        label: 'Повторите новый пароль',
        autocomplete: 'new-password',
    },
} as const;

// TODO: переписать на BaseForm
export default class EditForm extends Block<EditPasswordProps> {
    constructor(props: EditPasswordProps) {
        const children: Record<string, Block> = {};

        Object.entries(formFieldsMap).forEach(
            ([fieldName, { component: componentName, autocomplete }]) => {
                const inputKey = fieldName as InputKey;

                children[componentName] = new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: inputKey,
                    value: (props.form[inputKey]?.value as string) ?? '',
                    autocomplete: autocomplete,
                    onChange: (e: Event) => this.handleInputChange(e, inputKey),
                    onBlur: (e: Event) => this.handleInputBlur(e, inputKey, componentName),
                }) as Block;
            },
        );

        children.SendButton = new Button({
            'theme-default': true,
            type: 'submit',
            label: 'Сохранить',
        }) as Block;

        super(
            'form',
            {
                ...props,
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e: Event) => this.submitHandler(e),
                },
            },
            children,
        );
    }

    private handleInputChange(e: Event, fieldName: InputKey) {
        const el = e.target as HTMLInputElement;

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                [fieldName]: {
                    ...this.props.form[fieldName],
                    value: el.value,
                },
            },
        });
    }

    private handleInputBlur(e: Event, fieldName: InputKey, componentName: string) {
        const el = e.target as HTMLInputElement;
        const input = this.children[componentName] as LabelInput;
        let error = '';

        if (fieldName in validators) {
            const validator = validators[fieldName as keyof typeof validators];
            error = validator(el.value);
        }

        input.setProps({
            ...input.props,
            error: error,
        });

        this.setProps({
            ...this.props,
            form: {
                ...this.props.form,
                [fieldName]: {
                    ...this.props.form[fieldName],
                    value: el.value,
                    error: error,
                },
            },
        });
    }

    private submitHandler(e: Event) {
        e.preventDefault();
        const errors: Record<string, string> = {};

        Object.values(formFieldsMap).forEach(({ component }) => {
            const input = this.children[component] as Block;
            if (input) {
                input.setProps({
                    error: '',
                });
            }
        });

        Object.entries(this.props.form).forEach(([key, { value }]) => {
            if (key in validators) {
                const typedKey = key as keyof typeof validators;
                const error = validators[typedKey](value);

                if (error) {
                    const fieldConfig = formFieldsMap[key as InputKey];
                    if (fieldConfig) {
                        const input = this.children[fieldConfig.component] as Block;

                        errors[key] = error;

                        input.setProps({
                            error: error,
                        });
                    }
                }
            }
        });

        if (this.props.form.newPassword.value !== this.props.form.newPasswordConfirm.value) {
            errors.newPasswordConfirm = 'Пароли не совпадают';
        }

        if (isErrorsEmpty(errors)) {
            const form = this.props.form;

            const data: PasswordUpdateRequestDto = {
                oldPassword: form.oldPassword.value as string,
                newPassword: form.newPassword.value as string,
            };

            this.props.onSubmit?.(data);
            (e.target as HTMLFormElement).reset();
        }
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
            ${Object.values(formFieldsMap)
                .map(
                    ({ component, label }) => `
                        <div class="${styles.row}">
                            <div class="${styles.label}">${label}</div>
                            <div class="${styles.value}">
                                {{{${component}}}}
                            </div>
                        </div>
                    `,
                )
                .join('')}
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
