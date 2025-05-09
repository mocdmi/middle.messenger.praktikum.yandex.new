import { ROUTER } from '@const';
import * as context from './context';
import { Router, Store } from '@core';
import * as Pages from '@pages';
import '@assets/styles/styles.css';
import { AppStore } from '@types';
import { ChatContext } from './context/types/ChatContext';
import { ErrorContext } from './context/types/ErrorContext';

Store.getInstance().createStore<AppStore>({
    user: {
        isLoading: false,
        isError: '',
        user: null,
    },
    chats: {
        isLoading: false,
        isError: '',
        chats: null,
    },
    selectedChat: {
        isLoading: false,
        isError: '',
        chat: null,
        users: null,
    },
});

const router = Router.getInstance().createApp('#app');

router
    .use<ChatContext>(ROUTER.messenger, Pages.Messenger, context.chatContext)
    .use(ROUTER.editPassword, Pages.EditPasswordPage)
    .use(ROUTER.editProfile, Pages.EditProfilePage)
    .use(ROUTER.login, Pages.LoginPage)
    .use(ROUTER.settings, Pages.ProfilePage)
    .use(ROUTER.signUp, Pages.SignUpPage)
    .use<ErrorContext>('/404', Pages.ErrorPage, context.errorNotFoundContext)
    .use<ErrorContext>('/500', Pages.ErrorPage, context.errorServerContext)
    .start();
