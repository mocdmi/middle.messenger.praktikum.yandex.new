import { Profile } from '../../components';
import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import EditForm from './parts/edit-form';

export default class EditProfilePage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            EditProfile: new Profile({
                Children: new EditForm(props) as Block,
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{EditProfile}}}';
    }
}
