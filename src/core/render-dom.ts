import { Block } from './block';

export function renderDom(block: Block): void {
    const root: Element | null = document.querySelector('#app');

    if (!root) {
        throw new Error('Не найден корневой элемент');
    }

    block.hide();
    root.innerHTML = '';
    root.appendChild(block.getContent());
    block.show();
    block.dispatchComponentDidMount();
}
