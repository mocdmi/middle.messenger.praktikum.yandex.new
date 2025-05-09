export default class EventBus {
    listeners: Record<string, ((...args: unknown[]) => void)[]>;

    constructor() {
        this.listeners = {};
    }

    on<TEvent extends string, TArgs extends unknown[]>(
        event: TEvent,
        callback: (...args: TArgs) => void,
    ): void {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback as (...args: unknown[]) => void);
    }

    off<TEvent extends string, TArgs extends unknown[]>(
        event: TEvent,
        callback: (...args: TArgs) => void,
    ): void {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    }

    emit<TEvent extends string, TArgs extends unknown[]>(event: TEvent, ...args: TArgs): void {
        if (!this.listeners[event]) {
            return;
        }

        this.listeners[event].forEach(function (listener) {
            listener(...args);
        });
    }
}
