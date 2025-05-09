import { Block } from '@core';
import { InputType } from '@types';

interface InputAttrs {
    type: InputType;
    name: string;
    value: string;
    accept?: string;
    placeholder?: string;
    autocomplete?: string;
}

interface InputProps extends InputAttrs {
    className?: string;
    onChange?: (e: Event) => void;
    onBlur?: (e: Event) => void;
}

export default class Input extends Block<InputProps, InputAttrs> {
    constructor(props: InputProps) {
        super('input', {
            ...props,
            attrs: {
                type: props.type,
                name: props.name,
                value: props.value,
                accept: props.accept,
                placeholder: props.placeholder,
                autocomplete: props.autocomplete ?? 'off',
            },
            events: {
                ...(props.onChange ? { change: props.onChange } : {}),
                ...(props.onBlur ? { blur: props.onBlur } : {}),
            },
        });
    }

    componentDidUpdate(oldProps: InputProps, newProps: InputProps): boolean {
        if (oldProps.value !== newProps.value) {
            const input = this.getContent() as HTMLInputElement;

            if (input) {
                input.value = newProps.value || '';
            }

            this.setProps({
                ...this.props,
                value: newProps.value,
            });
        }

        return true;
    }

    // language=Handlebars
    render(): string {
        return '';
    }
}
