import { Block } from '@core';
import { PopupProps } from '../types';
import styles from '../styles.module.css';

export default class Inner extends Block<PopupProps> {
    constructor(props: PopupProps) {
        super(
            'div',
            {
                ...props,
                className: styles.inner,
            },
            {
                Body: props.Children,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <h2 class="${styles.title}">{{title}}</h2>
            {{{Body}}}
        `;
    }
}
