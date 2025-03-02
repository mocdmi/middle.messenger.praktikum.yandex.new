import { Block } from '../../core';
import styles from './styles.module.css';

interface LinkAttrs {
    href?: string;
    'data-to'?: string;
}

interface LinkProps extends LinkAttrs {
    'theme-default'?: boolean;
    'theme-danger'?: boolean;
    label: string;
    to?: string;
    href?: string;
    modificator?: string;
}

export default class Link extends Block<LinkProps, LinkAttrs> {
    constructor(props: LinkProps) {
        super('a', {
            ...props,
            className: `
                ${styles.link}
                ${props['theme-default'] ? styles.themeDefault : ''}
                ${props['theme-danger'] ? styles.themeDanger : ''}
                ${props.modificator ? props.modificator : ''}`,
            attrs: (() => {
                if (props.to) {
                    return { 'data-to': props.to, href: `#${props.to}` };
                } else {
                    return { href: props.href };
                }
            })(),
        });
    }

    // language=Handlebars
    render(): string {
        return `{{label}}`;
    }
}
