import { PageNames } from '../../types/page-names';
import ListItem from './parts/list-item';
import { Link } from './types';
import { Block } from '../../core';
import styles from './styles.module.css';

const links: Link[] = [
    { label: 'Chat page', to: PageNames.CHAT },
    { label: 'Profile page', to: PageNames.PROFILE },
    { label: 'Edit profile page', to: PageNames.EDIT_PROFILE },
    { label: 'Edit password page', to: PageNames.EDIT_PASSWORD },
    { label: 'Login page', to: PageNames.LOGIN },
    { label: 'Sign-in page', to: PageNames.SIGN_IN },
    { label: 'Server error page', to: PageNames.SERVER_ERROR },
    { label: 'Not found page', to: PageNames.NOT_FOUND },
];

export default class ListPage extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                LinkItems: links.map((props) => new ListItem(props)) as Block[],
            },
        );
    }
    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.list}">
                <nav>
                    <ul class="${styles.nav}">
                        {{#each LinkItems}}
                            {{{this}}}
                        {{/each}}
                    </ul>
                </nav>
            </main>
        `;
    }
}
