import { Block } from '@core';
import { Button, LabelInput } from '@components';

export type InputType = 'text' | 'password' | 'email';

export interface FormField {
    component: string;
    label: string;
    type: InputType;
    autocomplete?: string;
}

type FormFieldState = {
    value: string;
    error: string;
};

export interface BaseFormProps {
    form: Record<string, FormFieldState>;
}

export type FormValidator = (value: string) => string;

export interface FormConfig<TKey extends string> {
    formFields: Record<TKey, FormField>;
    validators: Record<TKey, FormValidator>;
}

export type SubmitButtonProps = {
    label: string;
};

export default abstract class BaseForm<
    TProps extends BaseFormProps,
    TKey extends string = string,
> extends Block<TProps> {
    public readonly props: TProps;
    public readonly children: Record<string, Block>;
    private config: FormConfig<TKey>;

    protected constructor(
        props: TProps,
        config: FormConfig<TKey>,
        submitButtonProps: SubmitButtonProps,
    ) {
        const children: Record<string, Block> = {};

        (Object.entries(config.formFields) as Array<[TKey, FormField]>).forEach(
            ([fieldName, field]) => {
                children[field.component] = new LabelInput({
                    'theme-default': true,
                    name: fieldName,
                    value: '',
                    type: field.type,
                    label: field.label,
                    autocomplete: field.autocomplete,
                    onChange: (e: Event) => this.handleInputChange(e, fieldName),
                    onBlur: (e: Event) => this.handleInputBlur(e, fieldName, field.component),
                }) as Block;
            },
        );

        children.SubmitButton = new Button({
            'theme-default': true,
            label: submitButtonProps.label,
            type: 'submit',
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
                    submit: (e: Event) => this.submitHandle(e),
                },
            },
            children,
        );

        this.props = props;
        this.children = children;
        this.config = config;
    }

    private handleInputChange(e: Event, fieldName: TKey): void {
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

    private handleInputBlur(e: Event, fieldName: TKey, componentName: string): void {
        const el = e.target as HTMLInputElement;
        const input = this.children[componentName] as LabelInput;
        let error = '';

        if (fieldName in this.config.validators) {
            const validator = this.config.validators[fieldName];
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

    private submitHandle(e: Event): void {
        e.preventDefault();
        const errors: Record<string, string> = {};

        (Object.entries(this.config.formFields) as Array<[TKey, FormField]>).forEach(
            ([_, field]) => {
                const input = this.children[field.component] as Block;

                if (input) {
                    input.setProps({
                        error: '',
                    });
                }
            },
        );

        Object.entries(this.props.form).forEach(([key, { value }]) => {
            if (key in this.config.validators) {
                const typedKey = key as TKey;
                const error = this.config.validators[typedKey](value);

                if (error) {
                    const fieldConfig = this.config.formFields[typedKey];
                    if (fieldConfig) {
                        const input = this.children[fieldConfig.component] as Block;
                        errors[key] = error;
                        input.setProps({ error });
                    }
                }
            }
        });

        this.onSubmit(e, errors);
    }

    protected abstract onSubmit(e: Event, errors: Record<string, string>): void;
}
