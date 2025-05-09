import { BaseAPI, HTTPTransport } from '@core';
import {
    ChatResponseDto,
    ChatRequestDto,
    CreateChatResponseDto,
    CreateChatRequestDto,
    DeleteChatRequestDto,
    DeleteChatResponseDto,
    AddUsersToChatRequestDto,
    AddUsersToChatResponseDto,
    DeleteUsersFromChatRequestDto,
    DeleteUsersFromChatResponseDto,
    GetChatTokenResponseDto,
    GetChatUsersResponseDto,
    GetChatUsersRequestDto,
} from './types';

export default class ChatsApi extends BaseAPI {
    apiInstance = new HTTPTransport('/chats');

    async request(data: ChatRequestDto = {}) {
        return this.apiInstance.get<ChatRequestDto, ChatResponseDto>('', { data });
    }

    async create(data: CreateChatRequestDto) {
        return this.apiInstance.post<CreateChatRequestDto, CreateChatResponseDto>('', { data });
    }

    async delete(data: DeleteChatRequestDto) {
        return this.apiInstance.delete<DeleteChatRequestDto, DeleteChatResponseDto>('', { data });
    }

    async addUsersToChat(data: AddUsersToChatRequestDto) {
        return this.apiInstance.put<AddUsersToChatRequestDto, AddUsersToChatResponseDto>('/users', {
            data,
        });
    }

    async deleteUsersFromChat(data: DeleteUsersFromChatRequestDto) {
        return this.apiInstance.delete<
            DeleteUsersFromChatRequestDto,
            DeleteUsersFromChatResponseDto
        >('/users', { data });
    }

    async getChatUsers(data: GetChatUsersRequestDto) {
        return this.apiInstance.get<GetChatUsersRequestDto, GetChatUsersResponseDto>(
            `/${data.id}/users`,
            {
                data,
            },
        );
    }

    async getChatToken(chatId: number) {
        return this.apiInstance.post<void, GetChatTokenResponseDto>(`/token/${chatId}`);
    }
}
