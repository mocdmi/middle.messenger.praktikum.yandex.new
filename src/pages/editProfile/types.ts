import { UserUpdateRequestDto } from '@api';

export type InputKey = 'email' | 'login' | 'first_name' | 'second_name' | 'display_name' | 'phone';

export interface EditProfileProps {
    name: string;
    avatar: string;
    form: Record<InputKey, ProfileFormInput>;
    onSubmit?: (form: UserUpdateRequestDto) => void;
}

export interface ProfileFormInput {
    value?: string;
    error: string;
}
