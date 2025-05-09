export type InputKey = 'login' | 'password';

export interface LoginFormProps {
    form: {
        login: {
            value: string;
            error: string;
        };
        password: {
            value: string;
            error: string;
        };
    };
}
