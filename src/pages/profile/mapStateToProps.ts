import { AppStore } from '@types';
import { ProfileProps } from './types';

export default function mapStateToProps(state: AppStore): ProfileProps {
    const user = state.user?.user;

    return {
        avatar: user?.avatar || '',
        items: [
            {
                label: 'Почта',
                value: user?.email,
            },
            {
                label: 'Логин',
                value: user?.login,
            },
            {
                label: 'Имя',
                value: user?.first_name,
            },
            {
                label: 'Фамилия',
                value: user?.second_name,
            },
            {
                label: 'Имя в чате',
                value: user?.display_name,
            },
            {
                label: 'Телефон',
                value: user?.phone,
            },
        ],
    };
}
