import { Block } from '../../../core';
import { Link } from '../types';
import styles from '../styles.module.css';
import { Link as LinkComponent } from '../../../components';

export default class ListItem extends Block<Link> {
    constructor(props: Link) {
        super(
            'li',
            {
                ...props,
                className: styles.item,
            },
            {
                PageLink: new LinkComponent({
                    ...props,
                    'theme-default': true,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <li class="${styles.item}">
                {{{PageLink}}}
            </li>
        `;
    }
}
