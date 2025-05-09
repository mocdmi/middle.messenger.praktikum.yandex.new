import { Button, LabelInput } from '@components';
import { Block, Validator } from '@core';
import { isErrorsEmpty } from '@helpers';
import { EditProfileProps, InputKey } from '../types';
import styles from '../styles.module.css';

const validators: Record<InputKey, (value: unknown) => string> = {
    email: (value: unknown) => Validator.validate((value ?? '') as string).isEmail(),
    login: (value: unknown) => Validator.validate((value ?? '') as string).isLogin(),
    first_name: (value: unknown) => Validator.validate((value ?? '') as string).isName(),
    second_name: (value: unknown) => Validator.validate((value ?? '') as string).isName(),
    display_name: () => '',
    phone: (value: unknown) => Validator.validate((value ?? '') as string).isPhone(),
};

const formFieldsMap = {
    email: {
        component: 'EmailInput',
        label: 'Почта',
        type: 'email',
        autocomplete: 'email',
    },
    login: {
        component: 'LoginInput',
        label: 'Логин',
        type: 'text',
        autocomplete: 'username',
    },
    first_name: {
        component: 'FirstNameInput',
        label: 'Имя',
        type: 'text',
        autocomplete: 'given-name',
    },
    second_name: {
        component: 'SecondNameInput',
        label: 'Фамилия',
        type: 'text',
        autocomplete: 'family-name',
    },
    display_name: {
        component: 'ChatNameInput',
        label: 'Имя в чате',
        type: 'text',
        autocomplete: 'nickname',
    },
    phone: {
        component: 'PhoneInput',
        label: 'Телефон',
        type: 'text',
        autocomplete: 'tel',
    },
} as const;

// TODO: переписать на BaseForm
export default class EditForm extends Block<EditProfileProps> {
    constructor(props: EditProfileProps) {
        const children: Record<string, Block> = {};

        Object.entries(formFieldsMap).forEach(
            ([fieldName, { component: componentName, type, autocomplete }]) => {
                const inputKey = fieldName as InputKey;

                children[componentName] = new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    name: inputKey,
                    value: (props.form[inputKey]?.value as string) ?? '',
                    type: type as 'email' | 'text',
                    label: '',
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

        if (isErrorsEmpty(errors)) {
            const data = Object.entries(this.props.form).reduce(
                (acc, [key, value]) => {
                    acc[key as InputKey] = value.value as string;
                    return acc;
                },
                {} as Record<InputKey, string>,
            );

            this.props.onSubmit?.(data);
        }
    }

    componentDidUpdate(_oldProps: EditProfileProps, newProps: EditProfileProps): boolean {
        if (newProps.form) {
            Object.entries(formFieldsMap).forEach(([fieldName, { component }]) => {
                const field = fieldName as InputKey;
                const input = this.children[component] as Block;

                if (newProps.form[field] && newProps.form[field].value !== undefined) {
                    const newValue = (newProps.form[field].value as string) || '';

                    input.setProps({
                        value: newValue,
                    });
                }
            });
        }

        return true;
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
