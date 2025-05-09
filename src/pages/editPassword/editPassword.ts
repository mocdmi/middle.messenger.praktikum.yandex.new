import { Block } from '@core';
import { connect } from '@helpers';
import { PasswordUpdateRequestDto } from '@api';
import { Profile } from '@components';
import { AuthService, UserService } from '@services';
import mapStateToProps from './mapStateToProps';
import { EditPasswordProps } from './types';
import EditForm from './parts/editForm';

class EditPasswordPage extends Block<EditPasswordProps> {
    private readonly authService = new AuthService();
    private readonly userService = new UserService();

    constructor(props: EditPasswordProps) {
        super('div', props, {
            EditPassword: new Profile({
                name: (props.name as string) || 'Пользователь',
                avatar: props.avatar,
                Children: new EditForm({
                    ...props,
                    onSubmit: async (data: PasswordUpdateRequestDto) => {
                        await this.userService.editPassword(data);
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

    componentDidUpdate(oldProps: EditPasswordProps, newProps: EditPasswordProps): boolean {
        if (oldProps !== newProps) {
            const editPassword = this.children.EditPassword as Block;

            if (editPassword) {
                const Avatar = editPassword.children.Avatar as Block;
                const bodyChildren = editPassword.children.Body;

                if (Array.isArray(bodyChildren) && bodyChildren.length > 0) {
                    const editForm = bodyChildren[0] as Block;

                    if (editForm) {
                        editForm.setProps(newProps);
                    }
                }

                if (Avatar) {
                    Avatar.setProps({ name: newProps.name as string, avatar: newProps.avatar });
                }
            }

            return true;
        }

        return false;
    }

    // language=Handlebars
    render(): string {
        return '{{{EditPassword}}}';
    }
}

export default connect(mapStateToProps)(EditPasswordPage);
