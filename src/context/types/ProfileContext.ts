export interface ProfileDetail {
    label: string;
    name: string;
    value: string;
    type: 'text' | 'password' | 'email';
    required: boolean;
}

export interface ProfileContext {
    name: string;
    detail: ProfileDetail[];
    password: string;
    showEditAvatar: boolean;
}
