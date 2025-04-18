import { ROUTER } from './const';
import * as context from './context';
import { Router } from './core';
import * as Pages from './pages';
import './assets/styles/styles.css';

window.router = new Router('#app');

window.router
    .use(ROUTER.messenger, Pages.ChatPage, context.chatContext)
    .use(ROUTER.editPassword, Pages.EditPasswordPage)
    .use(ROUTER.editProfile, Pages.EditProfilePage, context.profileContext)
    .use(ROUTER.login, Pages.LoginPage)
    .use(ROUTER.settings, Pages.ProfilePage, context.profileContext)
    .use(ROUTER.signUp, Pages.SignUpPage)
    .use('/404', Pages.ErrorPage, context.errorNotFoundContext)
    .use('/500', Pages.ErrorPage, context.errorServerContext)
    .start();
