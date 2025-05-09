import { Profile } from '@components';
import { Block } from '@core';
import { AuthService, UserService } from '@services';
import { EditProfileProps } from './types';
import EditForm from './parts/editForm';
import { connect } from '@helpers';
import { AppStore } from '@types';
import { UserUpdateRequestDto } from '@api';
import mapStateToProps from './mapStateToProps';

class EditProfilePage extends Block<EditProfileProps> {
    private readonly authService = new AuthService();
    private readonly userService = new UserService();

    constructor(props: EditProfileProps) {
        super('div', props, {
            EditProfile: new Profile({
                name: props.name || 'Пользователь',
                avatar: props.avatar || '',
                Children: new EditForm({
                    ...props,
                    onSubmit: (form: UserUpdateRequestDto) => {
                        this.userService.editUser(form);
                    },
                }) as Block,
            }) as Block,
        });
    }

    componentDidMount() {
        const getUser = async () => {
            await this.authService.getUser();
        };

        getUser();
    }

    componentDidUpdate(oldProps: EditProfileProps, newProps: EditProfileProps): boolean {
        if (oldProps !== newProps) {
            const editProfile = this.children.EditProfile as Block;

            if (editProfile) {
                const Avatar = editProfile.children.Avatar as Block;
                const bodyChildren = editProfile.children.Body;

                if (Array.isArray(bodyChildren) && bodyChildren.length > 0) {
                    const editForm = bodyChildren[0] as Block;

                    if (editForm) {
                        editForm.setProps(newProps);
                    }
                }

                if (Avatar) {
                    Avatar.setProps({ name: newProps.name, avatar: newProps.avatar });
                }
            }

            return true;
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return '{{{EditProfile}}}';
    }
}

export default connect<AppStore, EditProfileProps>(mapStateToProps)(EditProfilePage);
