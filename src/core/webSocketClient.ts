import { WEB_SOCKET_URL } from '@const';
import { EventBus } from '@core';

type Queue<TContent = string> = { type: string; content: TContent };

export default class WebSocketClient {
    private static EVENTS = {
        ERROR: 'error',
    } as const;

    private readonly url: string;
    private socket: WebSocket | null = null;
    private isConnected: boolean = false;
    private eventBus: EventBus = new EventBus();
    private messagesQueue: Queue[] = [];
    reconnectInterval: number = 3000;
    maxReconnectAttempts: number = 5;
    reconnectAttempts: number = 0;
    autoReconnect: boolean = true;

    constructor(url: string) {
        this.url = `${WEB_SOCKET_URL}/${url}`;
    }

    connect() {
        try {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = () => {
                this.isConnected = true;
                this.reconnectAttempts = 0;
                this.sendMessagesQueue();
                this.eventBus.emit('open');
            };

            this.socket.onmessage = (event: MessageEvent) => {
                try {
                    const { type, content } = JSON.parse(event.data);

                    if (!type) {
                        throw new Error('Event type is not defined');
                    }

                    this.eventBus.emit(type, content);
                } catch (error: Error) {
                    this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                        type: 'message',
                        message: error.message,
                    });
                }
            };

            this.socket.onerror = (error: Error) => {
                this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                    type: 'connection',
                    message: error.message,
                });
            };

            this.socket.onclose = (event: CloseEvent) => {
                this.isConnected = false;

                if (event.wasClean) {
                    this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                        type: 'closed',
                        message: 'Connection closed cleanly',
                    });
                } else {
                    this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                        type: 'closed',
                        message: `Connection closed with error: ${event.code} ${event.reason}`,
                    });
                }

                if (this.autoReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
                    this.reconnectAttempts++;

                    setTimeout(() => {
                        this.connect();
                    }, this.reconnectInterval);
                } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                    this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                        type: 'reconnect',
                        message: 'Max reconnect attempts reached',
                    });
                }
            };
        } catch (error: Error) {
            this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                type: 'initialisation',
                message: error.message,
            });
        }
    }

    private sendMessagesQueue<TContent = string>() {
        while (this.messagesQueue.length > 0 && this.isConnected) {
            const { type, content } = this.messagesQueue.shift() as Queue<TContent>;
            this.send(type, content);
        }
    }

    send<TContent = string>(type: string, content: TContent) {
        if (this.socket && this.isConnected) {
            try {
                const message = JSON.stringify({ content, type });
                this.socket.send(message);
            } catch (error: Error) {
                this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                    type: 'send',
                    message: error.message,
                });
            }
        } else {
            this.messagesQueue.push({ type, content });
            this.eventBus.emit(WebSocketClient.EVENTS.ERROR, {
                type: 'send',
                message: 'WebSocket is not connected. Cannot send message.',
            });
        }
    }

    subscribe<TContent = string>(type: string, callback: (content: TContent) => void) {
        this.eventBus.on(type, callback);
    }

    unsubscribe<TContent = string>(type: string, callback: (content: TContent) => void) {
        this.eventBus.off(type, callback);
    }

    close() {
        this.autoReconnect = false;

        if (this.socket) {
            this.socket.close();
        }
    }
}
