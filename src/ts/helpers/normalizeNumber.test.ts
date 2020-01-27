import normalizeNumber from './normalizeNumber';

describe('normalizeNumber function test', () => {
    test('need to return string 10', () => {
        expect(normalizeNumber(10)).toBe('10');
    });

    test('need to add zero if num less then 9', () => {
        expect(normalizeNumber(9)).toBe('09');
        expect(normalizeNumber(8)).toBe('08');
        expect(normalizeNumber(5)).toBe('05');
        expect(normalizeNumber(1)).toBe('01');
        expect(normalizeNumber(0)).toBe('00');
    });

    test('Error if NaN', () => {
        expect(() => {
            normalizeNumber(NaN);
        }).toThrow();
    });
});
