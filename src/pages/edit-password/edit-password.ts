import { ProfileContext } from '../../context/types/ProfileContext';
import { Block } from '../../core';
import { Profile } from '../../components/profile';
import EditForm from './parts/edit-form';

export default class EditPasswordPage extends Block<ProfileContext> {
    constructor(props: ProfileContext) {
        super('div', props, {
            EditPassword: new Profile({
                Children: new EditForm(props) as Block,
            }) as Block,
        });
    }

    // language=Handlebars
    render(): string {
        return '{{{EditPassword}}}';
    }
}
