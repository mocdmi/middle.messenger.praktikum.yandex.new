import * as context from './context';
import { Block } from './core';
import { renderDom } from './core/render-dom';
import * as Pages from './pages';
import './assets/styles/styles.css';
import { PageNames } from './types/page-names';

type PageComponent = new (context?: object) => Block;

type PagesConfig = Record<
    PageNames,
    {
        component: PageComponent;
        context?: object;
    }
>;

const pages: PagesConfig = {
    [PageNames.LOGIN]: { component: Pages.LoginPage as PageComponent },
    [PageNames.LIST]: { component: Pages.ListPage as PageComponent },
    [PageNames.CHAT]: { component: Pages.ChatPage as PageComponent, context: context.chatContext },
    [PageNames.SIGN_IN]: { component: Pages.SignInPage },

    [PageNames.EDIT_PASSWORD]: {
        component: Pages.EditPasswordPage as PageComponent,
        context: context.profileContext,
    },

    [PageNames.EDIT_PROFILE]: {
        component: Pages.EditProfilePage as PageComponent,
        context: context.profileContext,
    },

    [PageNames.PROFILE]: {
        component: Pages.ProfilePage as PageComponent,
        context: context.profileContext,
    },

    [PageNames.SERVER_ERROR]: {
        component: Pages.ErrorPage as PageComponent,
        context: context.errorServerContext,
    },

    [PageNames.NOT_FOUND]: {
        component: Pages.ErrorPage as PageComponent,
        context: context.errorNotFoundContext,
    },
};

function navigate(page: PageNames): void {
    const { component, context } = pages[page];
    const container = document.getElementById('app');

    if (container) {
        renderDom(new component(context) as Block);
    }
}

function route(e: Event): void {
    const target = e.target as HTMLElement;
    const to = target.getAttribute('data-to') as PageNames;

    if (to) {
        navigate(to);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
}

document.addEventListener('DOMContentLoaded', () => navigate(PageNames.LIST));
document.addEventListener('click', route);
