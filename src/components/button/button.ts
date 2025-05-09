import { Block } from '@core';
import styles from './styles.module.css';

type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonAttrs {
    type: ButtonType;
}

interface ButtonProps extends ButtonAttrs {
    'theme-default'?: boolean;
    'theme-blank'?: boolean;
    'theme-blank-light'?: boolean;
    rounded?: boolean;
    icon?: string;
    label?: string;
    onClick?: (e: Event) => void;
}

export default class Button extends Block<ButtonProps, ButtonAttrs> {
    constructor(props: ButtonProps) {
        super('button', {
            ...props,
            className: `
                ${styles.button}
                ${props['theme-default'] ? styles.themeDefault : ''}
                ${props['theme-blank'] ? styles.themeBlank : ''}
                ${props['theme-blank-light'] ? styles.themeBlankLight : ''}
                ${props.rounded ? styles.rounded : ''}
            `,
            attrs: {
                type: props.type,
            },
            events: {
                ...(props.onClick ? { click: props.onClick } : {}),
            },
        });
    }

    // language=Handlebars
    render(): string {
        return `
            {{#if icon}}
                <span class="${styles.icon} {{#if label}}${styles.iconOffset}{{/if}}" data-icon="{{icon}}"></span>
            {{/if}}
            {{label}}
        `;
    }
}
