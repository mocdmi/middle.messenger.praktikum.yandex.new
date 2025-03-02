import { Block } from '../../core';
import styles from './styles.module.css';

interface PanelProps {
    Children: Block;
}

export default class Panel extends Block<PanelProps> {
    constructor(props: PanelProps) {
        super(
            'div',
            {
                ...props,
                className: styles.panel,
            },
            {
                Body: Array.isArray(props.Children) ? props.Children : [props.Children],
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            {{#each Body}}
                {{{this}}}
            {{/each}}
        `;
    }
}
