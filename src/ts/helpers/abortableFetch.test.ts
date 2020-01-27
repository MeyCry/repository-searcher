import AbortController from 'abort-controller';
import fetch from 'node-fetch';

import {abortableFetch} from './abortableFetch';

(global as any).fetch = fetch;
(global as any).AbortController = AbortController;

describe('test abortableFetch', () => {
    test('correct call fetch', () => {
        const mockedFetch = spyOn(global, 'fetch')
            .and.returnValue(Promise.resolve());

        const controller = new AbortController();
        abortableFetch('http://api.test.com', {
            body: 'body'
        });

        expect(mockedFetch).toHaveBeenCalledTimes(1);
        expect(mockedFetch).toBeCalledWith('http://api.test.com', {
            body: 'body',
            signal: controller.signal,
        });
    });
});
