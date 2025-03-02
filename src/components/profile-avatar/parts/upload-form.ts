import { Block } from '../../../core';
import { Button } from '../../button';
import { Input } from '../../input';
import styles from '../styles.module.css';

export default class UploadForm extends Block {
    constructor() {
        super(
            'form',
            {
                attrs: {
                    method: 'POST',
                    action: '#',
                },
            },
            {
                FileInput: new Input({
                    className: styles.input,
                    type: 'file',
                    accept: 'image/*',
                    name: 'avatar',
                    value: '',
                    required: true,
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
                <div class="${styles.label}">
                    Выбрать файл на<br />
                    компьютере
                </div>
                {{{FileInput}}}
            </label>
            <div class="${styles.actionSubmit}">
                {{{SendButton}}}
            </div>
        `;
    }
}
