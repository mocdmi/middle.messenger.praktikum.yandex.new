export default abstract class BaseApi {
    create(_data?: unknown): void {
        throw new Error('Method not implemented.');
    }

    request(_data?: unknown): void {
        throw new Error('Method not implemented.');
    }

    update(_data?: unknown): void {
        throw new Error('Method not implemented.');
    }

    delete(_data?: unknown): void {
        throw new Error('Method not implemented.');
    }
}
