import { ChatContext, Contact } from './types/ChatContext';

const contacts: Contact[] = [
    {
        name: 'Андрей',
        lastMessage: 'Изображение',
        date: 'Пт',
        newMessagesNum: 2,
        active: true,
    },
    {
        name: 'Вася',
        lastMessage: 'Привет',
        date: '1 Мая 2020',
    },
    {
        name: 'Вася',
        lastMessage: 'Привет',
        date: '1 Мая 2020',
    },
    {
        name: 'Вася',
        lastMessage: 'Привет',
        date: '1 Мая 2020',
    },
];

const chatContext: ChatContext = {
    contacts,
};

export default chatContext;
