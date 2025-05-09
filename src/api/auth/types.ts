import { BaseUserDto, ErrorResponse } from '@api';

export interface SignUpRequestDto extends BaseUserDto {
    password: string;
}

interface SignUpResponse {
    id: number;
}

export type SignUpResponseDto = SignUpResponse | ErrorResponse;

export interface SignInRequestDto {
    login: string;
    password: string;
}

export type SignInResponseDto = string | ErrorResponse;
