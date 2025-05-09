export interface IChat {
    name: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export interface ChatContext {
    chats: IChat[];
}
