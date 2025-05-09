import { Block } from '@core';
import { Button } from '../button';
import { Popup } from '../popup';
import UploadForm from './parts/uploadForm';
import styles from './styles.module.css';
import noPhoto from '@assets/images/no-photo.svg';
import { UserService } from '@services';
import { API_URL } from '@const';

interface ProfileAvatarProps {
    name?: string;
    avatar: string;
    popupShow?: boolean;
}

export default class ProfileAvatar extends Block<ProfileAvatarProps> {
    private readonly userService = new UserService();

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
                    Children: new UploadForm({
                        onSubmit: async (file: File) => {
                            await this.userService.editAvatar(file);
                        },
                    }) as Block,
                    hidePopupHandler: () => {
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
                {{#if avatar}}
                    <img src="${API_URL}/resources/{{avatar}}" class="${styles.photo}" alt="{{name}}" />
                {{else}}
                    <img src="${noPhoto}" class="${styles.photo}" alt="{{name}}" />
                {{/if}}
                <div class="${styles.editAvatar}">
                    {{{OpenPopupButton}}}
                </div>
            </div>
            {{#if name}}<h2 class="${styles.name}">{{name}}</h2>{{/if}}
            {{#if popupShow}}
                {{{UploadForm}}}
            {{/if}}
        `;
    }
}
