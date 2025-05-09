import { PasswordUpdateRequestDto } from '@api';

export type InputKey = 'oldPassword' | 'newPassword' | 'newPasswordConfirm';

export interface EditPasswordProps {
    name: string;
    avatar: string;
    form: Record<InputKey, ProfileForm>;
    onSubmit?: (form: PasswordUpdateRequestDto) => void;
}

interface ProfileForm {
    value?: string;
    error: string;
}
