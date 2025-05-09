import { Sidebar } from '@components';
import { Block } from '@core';
import Actions from './parts/actions';
import SelectedChatInfo from './parts/selectedChatInfo';
import MessageForm from './parts/messageForm';
import styles from './styles.module.css';
import { ChatsService, AuthService } from '@services';

export default class Messenger extends Block {
    private readonly chatsService = new ChatsService();
    private readonly authService = new AuthService();

    constructor() {
        super(
            'div',
            {},
            {
                // TODO: Сделать пропсы опциональными
                SelectedChatInfo: new SelectedChatInfo({}) as Block,
                Sidebar: new Sidebar({}) as Block,
                MessageForm: new MessageForm({}) as Block,
                Actions: new Actions({}) as Block,
            },
        );
    }

    componentDidMount() {
        const init = async () => {
            await this.authService.getUser();
            await this.chatsService.getChats();
        };

        init();
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.main}">
                <header class="${styles.header}">
                    {{{SelectedChatInfo}}}
                    {{{Actions}}}
                </header>
                <main class="${styles.chat}">
                    <div class="${styles.noMessages}">Выберите чат, чтобы отправить сообщение</div>
                </main>
                <div class="${styles.sidebar}">
                    {{{Sidebar}}}
                </div>
                {{{MessageForm}}}
            </div>
        `;
    }
}
