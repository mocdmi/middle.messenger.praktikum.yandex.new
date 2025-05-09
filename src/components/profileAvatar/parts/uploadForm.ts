import { Block } from '@core';
import { Button } from '../../button';
import { Input } from '../../input';
import styles from '../styles.module.css';

interface UploadFormProps {
    fileName?: string;
    onSubmit?: (file: File) => void;
}

export default class UploadForm extends Block<UploadFormProps> {
    constructor(props: UploadFormProps) {
        super(
            'form',
            {
                attrs: {
                    method: 'POST',
                    action: '#',
                    'content-type': 'multipart/form-data',
                },
                events: {
                    submit: async (e) => {
                        e.preventDefault();

                        const file = (e.target as HTMLFormElement).avatar.files[0];

                        if (file) {
                            props.onSubmit?.(file);
                        }
                    },
                },
            },
            {
                FileInput: new Input({
                    className: styles.input,
                    type: 'file',
                    accept: 'image/*',
                    name: 'avatar',
                    value: '',
                    onChange: (e: Event) => {
                        const input = e.target as HTMLInputElement;

                        this.setProps({
                            ...props,
                            fileName: input.files?.[0]?.name,
                        });
                    },
                }) as Block,
                SendButton: new Button({
                    'theme-default': true,
                    label: 'Поменять',
                    type: 'submit',
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <label class="${styles.uploadAvatar}">
                {{#if fileName}}
                    <div class="${styles.label}">
                        {{fileName}}
                    </div>
                {{else}}
                    <div class="${styles.label}">
                        Выбрать файл на<br />
                        компьютере
                </div>
                {{/if}}
                {{{FileInput}}}
            </label>
            <div class="${styles.actionSubmit}">
                {{{SendButton}}}
            </div>
        `;
    }
}
