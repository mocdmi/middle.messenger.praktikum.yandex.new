import { LabelInput } from '../../../components';
import { ProfileDetail } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface FormRowProps extends ProfileDetail {
    handlerOnChange: (value: string) => void;
}

export default class FormRow extends Block<ProfileDetail> {
    constructor(props: FormRowProps) {
        super(
            'div',
            {
                ...props,
                className: styles.row,
            },
            {
                Input: new LabelInput({
                    ...props,
                    label: '',
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;
                        props.handlerOnChange(el.value);
                    },
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.label}">{{label}}</div>
            <div class="${styles.value}">
            {{{Input}}}
            </div>
        `;
    }
}
