import { Block } from '../core';

export type Attributes<T> = {
    className?: string;
    attrs?: T;
    events?: {
        [key: string]: (e: Event) => void;
    };
};

export type BlockConstructor<P extends object = object, A extends object = object> = new (
    props: P & Attributes<A>,
    children?: Record<string, Block | Block[]>,
) => Block<P, A>;
