import { HttpTransportResponse } from '@/types';
import HttpTransport from './httpTransport';

jest.mock('@/const', () => ({
    API_URL: 'https://example.com',
}));

describe('HttpTransport', () => {
    let apiInstance: HttpTransport;
    let mockXhr: jest.Mocked<Partial<XMLHttpRequest>>;

    function simulateLoad() {
        return (mockXhr as jest.Mocked<XMLHttpRequest>).onload?.(new ProgressEvent('load'));
    }

    function simulateError() {
        return (mockXhr as jest.Mocked<XMLHttpRequest>).onerror?.(new ProgressEvent('error'));
    }

    function expectSuccessResponse(result: HttpTransportResponse<void>) {
        expect(result.headers).toEqual({
            'Content-Type': 'application/json',
            'X-Test': 'test',
        });
        expect(result.statusText).toBe('OK');
        expect(result.status).toBe(200);
        expect(result.response).toEqual({ ok: true });
    }

    beforeEach(() => {
        apiInstance = new HttpTransport('/test');

        mockXhr = {
            open: jest.fn(),
            send: jest.fn(),
            withCredentials: true,
            setRequestHeader: jest.fn(),
            getAllResponseHeaders: jest.fn(() => 'Content-Type: application/json\r\nX-Test: test'),
            getResponseHeader: jest.fn((name: string) => {
                if (name === 'Content-Type') return 'application/json';
                if (name === 'X-Test') return 'test';
                return null;
            }),
            status: 200,
            statusText: 'OK',
            response: JSON.stringify({ ok: true }),
            onload: null,
            onreadystatechange: null,
            readyState: 4,
        };

        global.XMLHttpRequest = jest.fn(() => mockXhr);
    });

    it('should properly handle GET request and process JSON response', async () => {
        const promise = apiInstance.get('/example');

        simulateLoad();

        const result = await promise;

        expect(mockXhr.open).toHaveBeenCalledWith('GET', 'https://example.com/test/example');
        expectSuccessResponse(result);
    });

    it('should properly handle POST send JSON body request and process JSON response', async () => {
        const data = { name: 'test' };
        const promise = apiInstance.post('/example', { data });

        simulateLoad();

        const result = await promise;

        expect(mockXhr.open).toHaveBeenCalledWith('POST', 'https://example.com/test/example');
        expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(data));
        expectSuccessResponse(result);
    });

    it('should properly handle POST send FormData body request and not send Content-Type header', async () => {
        const formData = new FormData();
        formData.append('file', new Blob(['test']));
        const promise = apiInstance.post('/upload', { data: formData });

        simulateLoad();

        const result = await promise;

        expect(mockXhr.open).toHaveBeenCalledWith('POST', 'https://example.com/test/upload');
        expect(mockXhr.setRequestHeader).not.toHaveBeenCalledWith(
            'Content-Type',
            expect.anything(),
        );
        expect(mockXhr.send).toHaveBeenCalledWith(formData);
        expectSuccessResponse(result);
    });

    it('should properly handle PUT send JSON body request and process JSON response', async () => {
        const data = { name: 'test' };
        const promise = apiInstance.put('/example', { data });

        simulateLoad();

        const result = await promise;

        expect(mockXhr.open).toHaveBeenCalledWith('PUT', 'https://example.com/test/example');
        expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(data));
        expectSuccessResponse(result);
    });

    it('should properly handle DELETE send JSON body request and process JSON response', async () => {
        const data = { name: 'test' };
        const promise = apiInstance.delete('/example', { data });

        simulateLoad();

        const result = await promise;

        expect(mockXhr.open).toHaveBeenCalledWith('DELETE', 'https://example.com/test/example');
        expect(mockXhr.setRequestHeader).toHaveBeenCalledWith('Content-Type', 'application/json');
        expect(mockXhr.send).toHaveBeenCalledWith(JSON.stringify(data));
        expectSuccessResponse(result);
    });

    it('should handle network errors', async () => {
        const promise = apiInstance.get('/fail');

        simulateError();

        await expect(promise).rejects.toThrow('Ошибка соединения');
    });
});
