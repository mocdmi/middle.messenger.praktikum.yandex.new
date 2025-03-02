import { Button } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface ActionsProps {
    handlerShowAddAction: () => void;
    handlerShowRemoveAction: () => void;
}

export default class Actions extends Block<ActionsProps> {
    constructor(props: ActionsProps) {
        super(
            'div',
            {
                ...props,
                className: styles.actions,
            },
            {
                AddButton: new Button({
                    icon: 'add',
                    label: 'Добавить пользователя',
                    type: 'button',
                    onClick: props.handlerShowAddAction,
                }) as Block,
                RemoveButton: new Button({
                    icon: 'remove',
                    label: 'Удалить пользователя',
                    type: 'button',
                    onClick: props.handlerShowRemoveAction,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            {{{AddButton}}}
            {{{RemoveButton}}}
        `;
    }
}
