import { Block, Router } from '@core';
import { withRouter } from '@helpers';
import styles from './styles.module.css';

interface LinkAttrs {
    href?: string;
}

interface LinkProps extends LinkAttrs {
    'theme-default'?: boolean;
    'theme-danger'?: boolean;
    label: string;
    to?: string;
    href?: string;
    router?: Router;
    modificator?: string;
    onClick?: (e: Event) => void;
}

class Link extends Block<LinkProps, LinkAttrs> {
    constructor(props: LinkProps) {
        super('a', {
            ...props,
            className: `
                ${styles.link}
                ${props['theme-default'] ? styles.themeDefault : ''}
                ${props['theme-danger'] ? styles.themeDanger : ''}
                ${props.modificator ? props.modificator : ''}
            `,
            attrs: {
                href: props.href ?? props.to,
            },
            events: {
                click: (e: Event) => {
                    if (props.onClick) {
                        props.onClick(e);
                        return;
                    }

                    if (props.to) {
                        e.preventDefault();
                        props.router?.go(props.to);
                    }
                },
            },
        });
    }

    // language=Handlebars
    render(): string {
        return '{{label}}';
    }
}

export default withRouter(Link);
