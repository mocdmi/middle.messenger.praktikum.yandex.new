import { AppStore } from '@types';
import { EditProfileProps } from './types';

export default function mapStateToProps(state: AppStore): EditProfileProps {
    const user = state.user?.user;

    return {
        name: (user?.first_name as string) || '',
        avatar: user?.avatar || '',
        form: {
            email: {
                value: user?.email,
                error: '',
            },
            login: {
                value: user?.login,
                error: '',
            },
            first_name: {
                value: user?.first_name,
                error: '',
            },
            second_name: {
                value: user?.second_name,
                error: '',
            },
            display_name: {
                value: user?.display_name,
                error: '',
            },
            phone: {
                value: user?.phone,
                error: '',
            },
        },
    };
}
