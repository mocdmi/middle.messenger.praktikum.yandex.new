import { ROUTER } from '@const';
import { Block } from '@core';
import { connect } from '@helpers';
import { AppStore } from '@types';
import { Chat } from '../chat';
import { Link } from '../link';
import SearchForm from './parts/searchForm';
import styles from './styles.module.css';

interface ChatProps {
    id: number;
    title: string;
    avatar: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
}

interface SidebarProps {
    chats?: ChatProps[];
    selectedChatId?: number;
}

class Sidebar extends Block<SidebarProps> {
    constructor() {
        const props = {
            chats: [],
        };

        super(
            'nav',
            {
                ...props,
                className: styles.contacts,
            },
            {
                Chats: props.chats.map((props: ChatProps) => new Chat(props)) as Block[],
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

    componentDidUpdate(oldProps: SidebarProps, newProps: SidebarProps): boolean {
        if (oldProps !== newProps) {
            if (newProps.chats) {
                this.children.Chats = newProps.chats.map(
                    (props: ChatProps) =>
                        new Chat({
                            ...props,
                            active: props.id === newProps.selectedChatId,
                        }),
                ) as Block[];

                return true;
            }
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.linkWrap}">
                {{{ProfileLink}}}
            </div>
            {{{SearchForm}}}
            <div>
                {{#each Chats}}
                    {{{this}}}
                {{/each}}
            </div>
        `;
    }
}

function mapStateToProps(state: AppStore): SidebarProps {
    return {
        chats: state.chats.chats ?? [],
        selectedChatId: state.selectedChat.chat?.id,
    };
}

export default connect<AppStore, SidebarProps>(mapStateToProps)(Sidebar);
