import { ProfileProps } from '..';
import { Link } from '@components';
import { ROUTER } from '@const';
import { Block } from '@core';
import styles from '../styles.module.css';
import { AuthService } from '@services';

export default class ProfileInner extends Block<ProfileProps> {
    private readonly authService = new AuthService();

    constructor(props: ProfileProps) {
        super('div', props, {
            EditLink: new Link({
                'theme-default': true,
                label: 'Изменить данные',
                to: ROUTER.editProfile,
            }) as Block,
            EditPasswordLink: new Link({
                'theme-default': true,
                label: 'Изменить пароль',
                to: ROUTER.editPassword,
            }) as Block,
            LogoutLink: new Link({
                'theme-danger': true,
                label: 'Выйти',
                href: '#',
                onClick: (e: Event) => {
                    e.preventDefault();
                    this.authService.logout();
                },
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                {{#each items}}
                    <div class="${styles.row}">
                        <div class="${styles.label}">{{label}}</div>
                        <div class="${styles.value}">{{value}}</div>
                    </div>
                {{/each}}
            </div>
            <nav>
                <div class="${styles.row}">
                    {{{EditLink}}}
                </div>
                <div class="${styles.row}">
                    {{{EditPasswordLink}}}
                </div>
                <div class="${styles.row}">
                    {{{LogoutLink}}}
                </div>
            </nav>
        `;
    }
}
