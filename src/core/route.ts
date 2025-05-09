import { Block, BlockConstructor } from '@core';

export default class Route {
    private readonly path: string;
    private readonly rootQuery: string;
    private block: Block | null;
    private readonly context: object;
    private readonly BlockClass: BlockConstructor;

    constructor(path: string, BlockClass: BlockConstructor, props: object = {}, rootQuery: string) {
        this.path = path;
        this.rootQuery = rootQuery;
        this.context = props;
        this.block = null;
        this.BlockClass = BlockClass;
    }

    leave(): void {
        if (this.block) {
            this.block.hide();
        }
    }

    match(path: string): boolean {
        return path === this.path;
    }

    private renderDom(rootQuery: string, block: Block): void {
        const root = document.querySelector(rootQuery);

        if (!root) {
            throw new Error(`Element with selector "${rootQuery}" not found`);
        }

        root.innerHTML = '';
        root.append(block.getContent());
        block.show();
    }

    render(): void {
        if (!this.block) {
            this.block = new this.BlockClass(this.context);
        }

        this.renderDom(this.rootQuery, this.block);
        this.block.dispatchComponentDidMount();
    }
}
