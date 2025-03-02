import { Block } from '../../core';
import { InputType } from './types';

interface InputAttrs {
    type: InputType;
    name: string;
    value: string;
    accept?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: Event) => void;
}

interface InputProps extends InputAttrs {
    className?: string;
}

export default class Input extends Block<InputProps, InputAttrs> {
    constructor(props: InputProps) {
        super('input', {
            ...props,
            attrs: (() => {
                const attrs: InputAttrs = {
                    type: props.type,
                    name: props.name,
                    value: props.value,
                    accept: props.accept,
                    placeholder: props.placeholder,
                };

                if (props.required) {
                    attrs.required = true;
                }

                return attrs;
            })(),
            events: {
                ...(props.onChange ? { change: props.onChange } : {}),
            },
        });
    }

    // language=Handlebars
    render(): string {
        return '';
    }
}
