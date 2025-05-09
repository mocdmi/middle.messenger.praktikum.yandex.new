import { AuthApi, SignInRequestDto, SignUpRequestDto } from '@api';
import { ROUTER } from '@const';
import { Router, Store } from '@core';
import { AppStore } from '@types';

export default class AuthService {
    private readonly authApi = new AuthApi();
    private readonly router = Router.getInstance();
    private readonly store = Store.getInstance();

    constructor() {}

    async signUp(data: SignUpRequestDto): Promise<void> {
        try {
            const { status, response } = await this.authApi.create(data);

            if (status === 200) {
                this.router.go(ROUTER.messenger);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            } else {
                throw new Error(`Error sign up. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async login(data: SignInRequestDto): Promise<void> {
        try {
            const { status, response } = await this.authApi.login(data);

            if (status === 200) {
                this.router.go(ROUTER.messenger);
            } else if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            } else {
                throw new Error(`Error login. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getUser(): Promise<void> {
        if (this.store.getState<AppStore>().user?.user) {
            return;
        }

        try {
            const { status, response } = await this.authApi.request();

            if (status === 200) {
                this.store.set('user.user', response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            } else {
                throw new Error(`Error get user. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async logout(): Promise<void> {
        try {
            const { status } = await this.authApi.logout();

            if (status === 200) {
                this.store.set('user.user', null);
                this.router.go(ROUTER.login);
            } else {
                throw new Error(`Error logout. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
