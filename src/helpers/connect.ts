import { Block, BlockConstructor, Store, StoreEvents } from '@core';
import { isEqual } from '@helpers';

export default function connect<TStore extends object, TProps extends object>(
    mapStateToProps: (store: TStore) => TProps,
) {
    return function (block: BlockConstructor<TProps>): BlockConstructor<TProps> {
        return class extends block {
            private readonly onChangeStoreCallback: () => void;

            constructor(props: TProps, children?: Record<string, Block | Block[]>) {
                const store = Store.getInstance();
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state }, children);

                this.onChangeStoreCallback = () => {
                    const newState = mapStateToProps(store.getState());

                    if (!isEqual<TProps>(state, newState)) {
                        this.setProps({ ...newState });
                    }

                    state = newState;

                    if (process.env.NODE_ENV === 'development') {
                        console.log('state:', JSON.stringify(store.getState(), null, 2));
                    }
                };

                Store.getInstance().on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            // TODO: разобраться с удалением слушателя
            // componentWillUnmount(): void {
            //     super.componentWillUnmount();
            //     Store.getInstance().off(StoreEvents.Updated, this.onChangeStoreCallback);
            // }

            render(): string {
                return block.prototype.render.call(this);
            }
        };
    };
}
