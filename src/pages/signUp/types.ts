export type InputKey =
    | 'email'
    | 'login'
    | 'firstName'
    | 'secondName'
    | 'phone'
    | 'password'
    | 'confirmPassword';

export interface SignUpFormProps {
    form: {
        email: {
            value: string;
            error: string;
        };
        login: {
            value: string;
            error: string;
        };
        firstName: {
            value: string;
            error: string;
        };
        secondName: {
            value: string;
            error: string;
        };
        phone: {
            value: string;
            error: string;
        };
        password: {
            value: string;
            error: string;
        };
        confirmPassword: {
            value: string;
            error: string;
        };
    };
}
