export default function normalizeNumber(num: number): string {
    if (isNaN(num)) {
        throw new Error('Can\'t normalize NaN');
    }
    return num > 9
        ? num.toString()
        : `0${num}`;
}
