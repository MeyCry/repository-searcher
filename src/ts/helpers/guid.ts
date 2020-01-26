/**
 *
 * Create random guid
 * @example 0d7f40c5-d03b-d5df-ae8f-a7255a94095a
 * @return {string}
 *
 */
export default function guid():string {
    function s4():string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
