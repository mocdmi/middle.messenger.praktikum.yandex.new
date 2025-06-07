import { Block } from '@/core';

export type InputType = 'text' | 'email' | 'password' | 'file';

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

export enum WebSocketEvents {
    Error = 'error',
    Warning = 'warning',
}

export type WebsocketLog = {
    type: string;
    message: string;
};

export interface HttpTransportResponse<TResp> {
    headers: Record<string, string>;
    status: number;
    statusText: string;
    response: TResp;
}
