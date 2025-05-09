import { Link } from '@components';
import { ROUTER } from '@const';
import { Block } from '@core';
import styles from '../styles.module.css';
import SignUpForm from './signUpForm';

export default class PanelInner extends Block {
    constructor() {
        super(
            'div',
            {
                className: styles.inner,
            },
            {
                SignUpForm: new SignUpForm() as Block,
                LoginLink: new Link({
                    'theme-default': true,
                    label: 'Войти',
                    to: ROUTER.login,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <h2 class="${styles.title}">Регистрация</h2>
            {{{SignUpForm}}}
            <div class="${styles.login}">
                {{{LoginLink}}}
            </div>
        `;
    }
}
