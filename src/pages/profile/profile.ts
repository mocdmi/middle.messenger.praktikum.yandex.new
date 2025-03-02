import { Profile } from '../../components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import ProfileInner from './parts/profile-inner';

export default class ProfilePage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            Profile: new Profile({
                Children: new ProfileInner(props) as Block,
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{Profile}}}';
    }
}
