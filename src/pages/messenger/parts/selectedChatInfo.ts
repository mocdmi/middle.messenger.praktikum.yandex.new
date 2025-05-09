import { Block } from '@core';
import { connect } from '@helpers';
import { AppStore } from '@types';
import styles from '../styles.module.css';

interface TitleProps {
    selectedChatTitle?: string;
    selectedChatAvatar?: string;
}

class SelectedChatInfo extends Block {
    constructor() {
        const props = {
            selectedChatTitle: '',
            selectedChatAvatar: '',
        };

        super('div', props);
    }

    // language=Handlebars
    render() {
        return `
            <div class="${styles.selectedChatInfo}">
                {{#if selectedChatTitle}}
                    <div class="${styles.avatar}"></div>
                {{/if}}
                <h2 class="${styles.title}">{{selectedChatTitle}}</h2>
            </div>
        `;
    }
}

function mapStateToProps(state: AppStore) {
    return {
        selectedChatTitle: state.selectedChat.chat?.title,
        selectedChatAvatar: state.selectedChat.chat?.avatar,
    };
}

export default connect<AppStore, TitleProps>(mapStateToProps)(SelectedChatInfo);
