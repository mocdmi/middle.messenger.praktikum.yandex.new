import { Button, LabelInput } from '../../../components';
import { ProfileContext } from '../../../context/types/ProfileContext';
import { Block } from '../../../core';
import styles from '../styles.module.css';

interface EditFormProps extends ProfileContext {
    formState: {
        oldPassword: string;
        newPassword: string;
        newPasswordConfirm: string;
    };
}

export default class EditForm extends Block<EditFormProps> {
    constructor(props: ProfileContext) {
        super(
            'form',
            {
                ...props,
                formState: {
                    oldPassword: props.password,
                    newPassword: '',
                    newPasswordConfirm: '',
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
                PasswordInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'oldPassword',
                    value: props.password,
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                oldPassword: el.value,
                            },
                        });
                    },
                }) as Block,
                NewPasswordInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'newPassword',
                    value: '',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                newPassword: el.value,
                            },
                        });
                    },
                }) as Block,
                NewPasswordConfirmInput: new LabelInput({
                    'theme-blank': true,
                    'align-right': true,
                    'placeholder-right': true,
                    type: 'password',
                    name: 'newPasswordConfirm',
                    value: '',
                    required: true,
                    onChange: (e: Event) => {
                        const el = e.target as HTMLInputElement;

                        this.setProps({
                            ...this.props,
                            formState: {
                                ...this.props.formState,
                                newPasswordConfirm: el.value,
                            },
                        });
                    },
                }) as Block,
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
                <div class="${styles.row}">
                    <div class="${styles.label}">Старый пароль</div>
                    <div class="${styles.value}">
                        {{{PasswordInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Новый пароль</div>
                    <div class="${styles.value}">
                        {{{NewPasswordInput}}}
                    </div>
                </div>
                <div class="${styles.row}">
                    <div class="${styles.label}">Повторите новый пароль</div>
                    <div class="${styles.value}">
                        {{{NewPasswordConfirmInput}}}
                    </div>
                </div>
            </div>
            <div class="${styles.save}">
                {{{SendButton}}}
            </div>
        `;
    }
}
