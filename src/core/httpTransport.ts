import { API_URL } from '@const';

interface Options<TReq> extends Partial<XMLHttpRequest> {
    headers?: Record<string, string>;
    timeout?: number;
    data?: TReq;
    method?: string;
}

interface Response<TResp> {
    headers: Record<string, string>;
    status: number;
    statusText: string;
    response: TResp;
}

type Body = string | Blob | ArrayBuffer | ArrayBufferView | FormData | URLSearchParams | null;

type HTTPMethod = <TReq = void, TResp = void>(
    url: string,
    options?: Options<TReq>,
) => Promise<Response<TResp>>;

export default class HttpTransport {
    private readonly baseUrl: string;

    static METHODS = {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
    } as const;

    constructor(baseUrl: string) {
        this.baseUrl = API_URL + baseUrl;
    }

    private queryStringify<TReq>(data: TReq): string {
        if (typeof data !== 'object' || data === null) {
            throw new Error('Must be an object');
        }

        const props: string[] = [];

        for (const prop in data) {
            if (data[prop] !== null && data[prop] !== undefined) {
                props.push(`${prop}=${encodeURIComponent(data[prop].toString())}`);
            }
        }

        return `?${props.join('&')}`;
    }

    private createMethod(
        method: (typeof HttpTransport.METHODS)[keyof typeof HttpTransport.METHODS],
    ): HTTPMethod {
        return <TReq, TResp>(url: string, options: Options<TReq> = {}) =>
            this.request<TReq, TResp>(url, { ...options, method });
    }

    get = this.createMethod(HttpTransport.METHODS.GET);

    put = this.createMethod(HttpTransport.METHODS.PUT);

    post = this.createMethod(HttpTransport.METHODS.POST);

    delete = this.createMethod(HttpTransport.METHODS.DELETE);

    private request<TReq, TResp>(
        url: string,
        options: Options<TReq> = {},
    ): Promise<Response<TResp>> {
        const { headers = {}, data, method = HttpTransport.METHODS.GET, ...xhrOptions } = options;
        const isGet: boolean = method === HttpTransport.METHODS.GET;
        const fullUrl = `${this.baseUrl}${url}`;

        return new Promise((resolve, reject): void => {
            const xhr = new XMLHttpRequest();

            Object.assign(xhr, xhrOptions);

            xhr.timeout = options.timeout || 5000;
            xhr.open(
                method,
                isGet && !!data ? `${fullUrl}${this.queryStringify<TReq>(data)}` : fullUrl,
            );

            xhr.withCredentials = true;

            const updatedHeaders =
                typeof data === 'object' && !(data instanceof FormData)
                    ? { ...headers, 'Content-Type': 'application/json' }
                    : headers;

            for (const prop in updatedHeaders) {
                xhr.setRequestHeader(prop, updatedHeaders[prop]);
            }

            if (isGet || !data) {
                xhr.send();
            } else {
                const body:
                    | string
                    | Blob
                    | ArrayBuffer
                    | ArrayBufferView
                    | FormData
                    | URLSearchParams
                    | null =
                    typeof data === 'object' && !(data instanceof FormData)
                        ? JSON.stringify(data)
                        : (data as Body);

                xhr.send(body);
            }

            xhr.onload = (): void => {
                let parsedResponse = xhr.response;

                if (xhr.getResponseHeader('Content-Type')?.includes('application/json')) {
                    parsedResponse = JSON.parse(parsedResponse);
                }

                resolve({
                    headers: xhr
                        .getAllResponseHeaders()
                        .trim()
                        .split(/\r\n/)
                        .reduce((acc: Record<string, string>, item) => {
                            const [key, value] = item.split(': ');
                            acc[key] = value;
                            return acc;
                        }, {}),
                    status: xhr.status,
                    statusText: xhr.statusText,
                    response: parsedResponse as TResp,
                });
            };

            xhr.onerror = (): void => reject('Ошибка соединения');
            xhr.onabort = (): void => reject('Запрос прерван');
            xhr.ontimeout = (): void => reject('Таймаут');
        });
    }
}
