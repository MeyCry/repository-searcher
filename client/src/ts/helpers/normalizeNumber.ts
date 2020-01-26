export default function normalizeNumber(num: number): string {
    return num > 9
        ? num.toString()
        : `0${num}`;
}
