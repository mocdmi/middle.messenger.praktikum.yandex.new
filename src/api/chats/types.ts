import { BaseUserDto, ErrorResponse } from '../types';

export interface ChatUserDto {
    id: number;
    first_name: string;
    second_name: string;
    display_name: string;
    login: string;
    email: string;
    avatar: string;
    role: string;
}

export interface ChatDto {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    last_message: {
        user: BaseUserDto;
        time: string;
        content: string;
    };
}

export interface ChatRequestDto {
    title?: string;
    offset?: number;
    limit?: number;
}

export type ChatResponseDto = ChatDto[];

export interface CreateChatRequestDto {
    title: string;
}

interface CreateChatResponse {
    id: number;
}

export type CreateChatResponseDto = CreateChatResponse | ErrorResponse;

export interface DeleteChatRequestDto {
    chatId: number;
}

export interface DeleteChatResponseDto {
    userId: number;
    result: {
        id: number;
        title: string;
        avatar: string;
        created_by: string;
    };
}

export interface AddUsersToChatRequestDto {
    users: number[];
    chatId: number;
}

export type AddUsersToChatResponseDto = string | ErrorResponse;

export interface DeleteUsersFromChatRequestDto {
    users: number[];
    chatId: number;
}

export type DeleteUsersFromChatResponseDto = string | ErrorResponse;

export interface GetChatUsersRequestDto {
    id: number;
    offset?: number;
    limit?: number;
    name?: string;
    email?: string;
}

export type GetChatUsersResponseDto = ChatUserDto[];

export type GetChatTokenResponseDto = {
    token: string;
};
