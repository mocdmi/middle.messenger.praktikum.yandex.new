import { ROUTER } from '../../const';
import { ChatContext, Contact } from '../../context/types/ChatContext';
import { Block } from '../../core';
import { ContactCard } from '../contact-card';
import { Link } from '../link';
import SearchForm from './parts/search-form';
import styles from './styles.module.css';

export default class Contacts extends Block<ChatContext> {
    constructor(props: ChatContext) {
        super(
            'nav',
            {
                ...props,
                className: styles.contacts,
            },
            {
                Cards: props.contacts.map((contact: Contact) => {
                    return new ContactCard(contact) as Block;
                }),
                ProfileLink: new Link({
                    'theme-default': true,
                    label: 'Профиль',
                    to: ROUTER.settings,
                    modificator: styles.link,
                }) as Block,
                SearchForm: new SearchForm() as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.linkWrap}">
                {{{ProfileLink}}}
            </div>
            {{{SearchForm}}}
            <div>
                {{#each Cards}}
                    {{{this}}}
                {{/each}}
            </div>
        `;
    }
}
