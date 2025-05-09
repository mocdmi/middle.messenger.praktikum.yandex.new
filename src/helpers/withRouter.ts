import { Block, BlockConstructor, Router } from '@core';

export default function withRouter<TProps extends object = object, TAttrs extends object = object>(
    block: BlockConstructor<TProps, TAttrs>,
): BlockConstructor<TProps, TAttrs> {
    return class extends block {
        constructor(props: TProps, children?: Record<string, Block | Block[]>) {
            super({ ...props, router: Router.getInstance() }, children);
        }

        render(): string {
            return block.prototype.render.call(this);
        }
    };
}
