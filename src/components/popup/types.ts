import { Block } from '../../core';

export interface PopupProps {
    title: string;
    active?: boolean;
    Children: Block;
    handlerHidePopup: () => void;
}
