import {
    ChatsApi,
    ChatRequestDto,
    CreateChatRequestDto,
    DeleteChatRequestDto,
    AddUsersToChatRequestDto,
    DeleteUsersFromChatRequestDto,
    GetChatUsersRequestDto,
    ChatDto,
    ChatUserDto,
} from '@api';
import { Store } from '@core';
import { AppStore, ChatUser, Chat } from '@types';

export default class ChatsService {
    private readonly apiInstance = new ChatsApi();
    private readonly store = Store.getInstance();

    constructor() {}

    async getChats(data: ChatRequestDto = {}): Promise<void> {
        if (this.store.getState<AppStore>().chats?.chats) {
            return;
        }

        try {
            const { status, response } = await this.apiInstance.request(data);

            if (status === 200) {
                const chats = response.reduce((acc: Chat[], chat: ChatDto) => {
                    acc.push({
                        id: chat.id,
                        title: chat.title,
                        lastMessage: chat.last_message?.content,
                        date: chat.last_message?.time,
                        newMessagesNum: chat.unread_count,
                        avatar: chat.avatar,
                    });

                    return acc;
                }, []);

                this.store.set('chats.chats', chats);
            } else {
                throw new Error(`Error get chats. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async createChat(title: string): Promise<void> {
        try {
            const data: CreateChatRequestDto = { title };
            const { status, response } = await this.apiInstance.create(data);

            if (status === 200) {
                console.log(response);
            } else if ('reason' in response) {
                throw new Error(response.reason);
            } else {
                throw new Error(`Error create chat. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteChat(chatId: number): Promise<void> {
        try {
            const data: DeleteChatRequestDto = { chatId };
            const { status, response } = await this.apiInstance.delete(data);

            if (status === 200) {
                console.log(response);
            } else {
                throw new Error(`Error delete chat. Status: ${status}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async addUsersToChat(chatId: number, userIds: number[]): Promise<void> {
        try {
            const data: AddUsersToChatRequestDto = {
                chatId,
                users: userIds,
            };

            const { status, response } = await this.apiInstance.addUsersToChat(data);

            if (status === 200) {
                console.log(response);
            } else if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            } else {
                throw new Error(`Error add users to chat. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async deleteUsersFromChat(chatId: number, userIds: number[]): Promise<void> {
        try {
            const data: DeleteUsersFromChatRequestDto = {
                chatId,
                users: userIds,
            };
            const { status, response } = await this.apiInstance.deleteUsersFromChat(data);

            if (status === 200) {
                console.log(response);
            } else if (typeof response === 'object' && 'reason' in response) {
                throw new Error(response.reason);
            } else {
                throw new Error(`Error delete users from chat. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getChatUsers(chatId: number): Promise<void> {
        try {
            const data: GetChatUsersRequestDto = { id: chatId };
            const { status, response } = await this.apiInstance.getChatUsers(data);

            if (status === 200) {
                const users = response.reduce((acc: ChatUser[], user: ChatUserDto) => {
                    acc.push({
                        id: user.id,
                        avatar: user.avatar,
                        first_name: user.first_name,
                    });

                    return acc;
                }, []);

                this.store.set('selectedChat.users', users);
            } else {
                throw new Error(`Error get chat users. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }

    async getChatToken(chatId: number): Promise<string> {
        try {
            const { status, response } = await this.apiInstance.getChatToken(chatId);

            if (status === 200) {
                return response.token;
            } else {
                throw new Error(`Error get chat token. Status: ${status}`);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    }
}
