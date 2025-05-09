import { Profile } from '@components';
import { Block } from '@core';
import { connect } from '@helpers';
import { AuthService } from '@services';
import { AppStore } from '@types';
import ProfileInner from './parts/profileInner';
import { ProfileProps } from './types';
import mapStateToProps from './mapStateToProps';

class ProfilePage extends Block<ProfileProps> {
    private readonly authService = new AuthService();

    constructor(props: ProfileProps) {
        super('div', props, {
            Profile: new Profile({
                avatar: props.avatar,
                Children: new ProfileInner(props) as Block,
            }) as Block,
        });
    }

    componentDidMount() {
        const getUser = async () => {
            await this.authService.getUser();
        };

        getUser();
    }

    componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        if (oldProps !== newProps) {
            const profile = this.children.Profile as Block;

            if (profile) {
                const Avatar = profile.children.Avatar as Block;
                const bodyChildren = profile.children.Body;

                if (Array.isArray(bodyChildren) && bodyChildren.length > 0) {
                    const profileInner = bodyChildren[0] as Block;

                    if (profileInner) {
                        profileInner.setProps(newProps);
                    }
                }

                if (Avatar) {
                    Avatar.setProps({ avatar: newProps.avatar });
                }
            }
        }

        return true;
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}

export default connect<AppStore, ProfileProps>(mapStateToProps)(ProfilePage);
