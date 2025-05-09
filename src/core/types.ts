import { Block } from '@core';

export type Attributes<TAttrs> = {
    className?: string;
    attrs?: TAttrs;
    events?: {
        [key: string]: (e: Event) => void;
    };
};

export type BlockConstructor<TProps extends object = object, TAttrs extends object = object> = new (
    props: TProps & Attributes<TAttrs>,
    children?: Record<string, Block | Block[]>,
) => Block<TProps, TAttrs>;

export enum StoreEvents {
    Updated = 'updated',
}
