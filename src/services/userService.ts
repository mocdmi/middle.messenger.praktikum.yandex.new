import { UserApi, PasswordUpdateRequestDto, UserUpdateRequestDto } from '@api';
import { Store } from '@core';

export default class UserService {
    private readonly store = Store.getInstance();
    private readonly userApi = new UserApi();

    constructor() {}

    async editUser(data: UserUpdateRequestDto): Promise<void> {
        try {
            const { status, response } = await this.userApi.update(data);

            if (status === 200) {
                this.store.set('user.user', response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async editAvatar(file: File): Promise<void> {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const { status, response } = await this.userApi.updateAvatar(formData);

            if (status === 200) {
                this.store.set('user.user', response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async editPassword(data: PasswordUpdateRequestDto): Promise<void> {
        try {
            const { status } = await this.userApi.updatePassword(data);

            if (status !== 200) {
                throw new Error(`Error edit password. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }
}
