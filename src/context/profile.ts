import { ProfileContext, ProfileDetail } from './types/ProfileContext';

const detail: ProfileDetail[] = [
    {
        label: 'Почта',
        name: 'email',
        value: 'pochta@yandex.ru',
        type: 'email',
        required: true,
    },
    {
        label: 'Логин',
        name: 'login',
        value: 'ivanivanov',
        type: 'text',
        required: true,
    },
    {
        label: 'Имя',
        name: 'first_name',
        value: 'Иван',
        type: 'text',
        required: true,
    },
    {
        label: 'Фамилия',
        name: 'second_name',
        value: 'Иванов',
        type: 'text',
        required: true,
    },
    {
        label: 'Имя в чате',
        name: 'display_name',
        value: 'Иван',
        type: 'text',
        required: true,
    },
    {
        label: 'Телефон',
        name: 'phone',
        value: '+7 (909) 967 30 30',
        type: 'text',
        required: true,
    },
];

const profileContext: ProfileContext = {
    name: 'Иван',
    password: '123456',
    showEditAvatar: false,

    detail,
};

export default profileContext;
