import { Block } from '../../core';
import { Button } from '../button';
import { Popup } from '../popup';
import UploadForm from './parts/upload-form';
import styles from './styles.module.css';
import noPhoto from '../../assets/images/no-photo.svg';

interface ProfileAvatarProps {
    name?: string;
    popupShow?: boolean;
}

export default class ProfileAvatar extends Block<ProfileAvatarProps> {
    constructor(props: ProfileAvatarProps) {
        super(
            'div',
            {
                ...props,
                className: styles.avatar,
            },
            {
                UploadForm: new Popup({
                    title: 'Загрузите файл',
                    Children: new UploadForm() as Block,
                    handlerHidePopup: () => {
                        this.setProps({
                            ...props,
                            popupShow: false,
                        });
                    },
                }) as Block,
                OpenPopupButton: new Button({
                    'theme-blank-light': true,
                    label: 'Поменять аватар',
                    type: 'submit',
                    onClick: () => {
                        this.setProps({
                            ...props,
                            popupShow: true,
                        });
                    },
                }) as Block,
            },
        );
    }

    // language=Handlebars
    render(): string {
        return `
            <div class="${styles.photoWrap}">
                <img src="${noPhoto}" class="${styles.photo}" alt="{{name}}" />
                <div class="${styles.editAvatar}">
                    {{{OpenPopupButton}}}
                </div>
            </div>
            {{#if popupShow}}
                {{{UploadForm}}}
            {{/if}}
        `;
    }
}
