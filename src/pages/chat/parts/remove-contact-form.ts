import { Button, LabelInput } from '../../../components';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface RemoveContactFormProps {
    formState: {
        login: string;
    };
}

export default class RemoveContactForm extends Block<RemoveContactFormProps> {
    constructor() {
        super(
            'form',
            {
                formState: {
                    login: '',
                },
                attrs: {
                    action: '#',
                    method: 'POST',
                },
                events: {
                    submit: (e) => {
                        e.preventDefault();
                        const el = e.target as HTMLFormElement;
                        console.log(this.props.formState);
                        el.reset();
                    },
                },
            },
            {
                LoginInput: new LabelInput({
                    'theme-default': true,
                    name: 'login',
                    value: '',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            formState: {
                                ...this.props.formState,
                                login: el.value,
                            },
                        });
                    },
                }) as Block,
                RemoveButton: new Button({
                    'theme-default': true,
                    label: 'Удалить',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.actionField}">
                {{{LoginInput}}}
            </div>
            <div class="${styles.actionSubmit}">
                {{{RemoveButton}}}
            </div>
        `;
    }
}
