import { Link } from '../../../components';
import { ROUTER } from '../../../const';
import { Block } from '../../../core';
import styles from '../styles.module.css';
import SignInForm from './sign-in-form';

export default class PanelInner extends Block {
    constructor() {
        super(
            'div',
            {
                className: styles.inner,
            },
            {
                SignInForm: new SignInForm() as Block,
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
            {{{SignInForm}}}
            <div class="${styles.login}">
                {{{LoginLink}}}
            </div>
        `;
    }
}
