export type AbortableResponsePromise = Promise<Response> & {abort: () => void};


export const abortableFetch = function (input: RequestInfo, init: RequestInit = {}): AbortableResponsePromise {
    let abort = () => {
        console.error('Abort is not available for `init` object with signal');
    };
    if (!('signal' in init)) {
        const controller = new AbortController();
        const {signal} = controller;
        init.signal = signal;
        abort = () => {
            controller.abort();
        };
    }

    const request: any = fetch(input, init);
    request.abort = abort;
    return request as AbortableResponsePromise;
};
