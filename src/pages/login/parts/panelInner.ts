import { Link } from '@components';
import { ROUTER } from '@const';
import { Block } from '@core';
import styles from '../styles.module.css';
import LoginForm from './loginForm';

export default class PanelInner extends Block {
    constructor() {
        super(
            'div',
            {
                className: styles.inner,
            },
            {
                LoginForm: new LoginForm() as Block,
                SignUpLink: new Link({
                    'theme-default': true,
                    label: 'Нет аккаунта?',
                    to: ROUTER.signUp,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <h2 class="${styles.title}">Вход</h2>
            {{{LoginForm}}}
            <div class="${styles.signUp}">
                {{{SignUpLink}}}
            </div>
        `;
    }
}
