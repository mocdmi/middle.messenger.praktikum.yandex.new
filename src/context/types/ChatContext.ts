export interface Contact {
    name: string;
    lastMessage: string;
    date: string;
    newMessagesNum?: number;
    active?: boolean;
}

export interface ChatContext {
    contacts: Contact[];
}
