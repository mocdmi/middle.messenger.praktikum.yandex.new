import { Block } from '../../core';
import { PageNames } from '../../types/page-names';
import { Link } from '../link';
import { ProfileAvatar } from '../profile-avatar';
import styles from './styles.module.css';

interface ProfileProps {
    name?: string;
    Children: Block | Block[];
}

export default class Profile extends Block<ProfileProps> {
    constructor(props: ProfileProps) {
        super(
            'div',
            {
                ...props,
                className: styles.profile,
            },
            {
                Avatar: new ProfileAvatar(props) as Block,
                Body: Array.isArray(props.Children) ? props.Children : [props.Children],
                BackButton: new Link({
                    label: 'Back',
                    to: PageNames.CHAT,
                    modificator: styles.backLink,
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.inner}">
                <div class="${styles.avatar}">
                    {{{Avatar}}}
                </div>
                {{#each Body}}
                    {{{this}}}
                {{/each}}
            </main>
            <div class="${styles.back}">
                {{{BackButton}}}
            </div>
        `;
    }
}
