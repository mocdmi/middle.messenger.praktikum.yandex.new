import { BaseAPI, HTTPTransport } from '@core';
import { UserResponseDto } from '@api';
import {
    PasswordUpdateRequestDto,
    PasswordUpdateResponseDto,
    SearchUserRequestDto,
    UserUpdateRequestDto,
} from './types';

export default class UserApi extends BaseAPI {
    apiInstance = new HTTPTransport('/user');

    async update(data: UserUpdateRequestDto) {
        return this.apiInstance.put<UserUpdateRequestDto, UserResponseDto>('/profile', { data });
    }

    async updateAvatar(data: FormData) {
        return this.apiInstance.put<FormData, UserResponseDto>('/profile/avatar', { data });
    }

    async updatePassword(data: PasswordUpdateRequestDto) {
        return this.apiInstance.put<PasswordUpdateRequestDto, PasswordUpdateResponseDto>(
            '/password',
            { data },
        );
    }

    async search(data: SearchUserRequestDto) {
        return this.apiInstance.post<SearchUserRequestDto, UserResponseDto>('/search', { data });
    }
}
