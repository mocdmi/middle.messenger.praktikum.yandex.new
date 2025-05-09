import { Panel } from '@components';
import { Block } from '@core';
import PanelInner from './parts/panelInner';
import styles from './styles.module.css';

export default class LoginPage extends Block {
    constructor() {
        super(
            'div',
            {},
            {
                Panel: new Panel({
                    Children: new PanelInner(),
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <main class="${styles.login}">
                {{{Panel}}}
            </main>
        `;
    }
}
