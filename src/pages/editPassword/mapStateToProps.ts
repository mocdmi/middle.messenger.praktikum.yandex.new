import { AppStore } from '@types';
import { EditPasswordProps } from './types';

export default function mapStateToProps(state: AppStore): EditPasswordProps {
    const user = state.user?.user;

    return {
        name: (user?.first_name as string) || '',
        avatar: user?.avatar || '',
        form: {
            oldPassword: {
                value: '',
                error: '',
            },
            newPassword: {
                value: '',
                error: '',
            },
            newPasswordConfirm: {
                value: '',
                error: '',
            },
        },
    };
}
