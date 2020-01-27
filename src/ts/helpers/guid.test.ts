import guid from './guid';

describe('guid testing', () => {
    test('generate guid id', () => {
        const id1 = guid();
        const id2 = guid();
        expect(id1).not.toBe(id2);
    });

    test('check length of id', () => {
        expect(guid().length).toBe(36);
    });
});
