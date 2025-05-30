import { Sidebar } from '@/components';
import { Block } from '@/core';
import { Chat } from '@/components';
import { ChatsService, AuthService } from '@/services';
import styles from './styles.module.css';

export default class Messenger extends Block {
    private readonly chatsService = new ChatsService();
    private readonly authService = new AuthService();

    constructor() {
        super(
            'div',
            {},
            {
                Sidebar: new Sidebar({ chats: [] }) as Block,
                Chat: new Chat({}) as Block,
            },
        );
    }

    componentDidMount() {
        const getData = async () => {
            await this.authService.getUser();
            await this.chatsService.getChats();
        };

        void getData();
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.main}">
                <div class="${styles.sidebarWrap}">
                    {{{Sidebar}}}
                </div>
                <div class="${styles.chatWrap}">
                    {{{Chat}}}
                </div>
            </div>
        `;
    }
}
