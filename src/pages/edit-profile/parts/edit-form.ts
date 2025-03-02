import { Button } from '../../../components';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';
import FormRow from './form-row';

type FormInputs = {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string;
};

interface EditFormProps extends ProfileContext {
    formState: FormInputs;
}

export default class EditForm extends Block<EditFormProps> {
    constructor(props: ProfileContext) {
        super(
            'form',
            {
                ...props,
                formState: props.detail.reduce((acc, { name, value }) => {
                    return { ...acc, [name]: value };
                }, {}) as FormInputs,
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
                FormRows: props.detail.map(
                    (props) =>
                        new FormRow({
                            ...props,
                            handlerOnChange: (value: string) => {
                                this.setProps({
                                    ...this.props,
                                    formState: {
                                        ...this.props.formState,
                                        [props.name]: value,
                                    },
                                });
                            },
                        }),
                ) as Block[],
                SendButton: new Button({
                    'theme-default': true,
                    type: 'submit',
                    label: 'Сохранить',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.detail}">
                {{#each FormRows}}
                    {{{this}}}
                {{/each}}
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
