import { Block } from '@/core';
import { Button, Popup } from '@/components';
import { connect } from '@/helpers';
import { UserService } from '@/services';
import { API_URL } from '@/const';
import noPhoto from '@/assets/images/no-photo.svg';
import { AppStore } from '@/store';
import UploadForm from './parts/uploadForm';
import styles from './styles.module.css';

interface ProfileAvatarProps {
    name?: string;
    avatar?: string;
    isShowUploadForm?: boolean;
}

class ProfileAvatar extends Block<ProfileAvatarProps> {
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

                            this.setProps({
                                ...this.props,
                                isShowUploadForm: false,
                            });
                        },
                    }) as Block,
                    hidePopupHandler: () => {
                        this.setProps({
                            ...this.props,
                            isShowUploadForm: false,
                        });
                    },
                }) as Block,
                OpenPopupButton: new Button({
                    'theme-blank-light': true,
                    label: 'Поменять аватар',
                    type: 'submit',
                    onClick: () => {
                        this.setProps({
                            ...this.props,
                            isShowUploadForm: true,
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
            {{#if isShowUploadForm}}
                {{{UploadForm}}}
            {{/if}}
        `;
    }
}

function mapStateToProps(state: AppStore): ProfileAvatarProps {
    return {
        name: state.user?.user?.first_name,
        avatar: state.user?.user?.avatar,
    };
}

export default connect<AppStore, ProfileAvatarProps>(mapStateToProps)(ProfileAvatar);
