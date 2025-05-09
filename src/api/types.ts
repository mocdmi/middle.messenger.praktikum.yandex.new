export interface ErrorResponse {
    reason: string;
}

export interface BaseUserDto {
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    phone: string;
}

interface UserResponse extends BaseUserDto {
    id: number;
    display_name: string;
    avatar: string;
}

export type UserResponseDto = UserResponse | ErrorResponse;
