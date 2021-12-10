declare module 'divide-it' {
    namespace DivideIt {
        interface DI {
            /**
             * @public
             * @description Divide the string into groups of n
             * @param {string} str origin string
             * @param {number} n number of characters in every group
             * @return {string[]}
             * @example
             * DI.divideByN("AaBbCcDd", 2);  // output: ["Aa", "Bb", "Cc", "Dd"]
             * DI.divideByN("AaBbCcDdE", 2);  // output: ["Aa", "Bb", "Cc", "Dd", "E"]
             */
            divideByN(str: string, n: number): string[]

            /**
             * @public
             * @description divide the string into groups of [...ns]
             * @param {string} str origin string
             * @param {number[]} ns number of characters in groups(in order)
             * @param {number} rest how to divide the rest of the string
             * @return {string[]}
             * @example
             * DI.divideByNs("ABbCcc", [1,2,3]);  // output: ["A", "Bb", "Ccc"]
             * DI.divideByNs("ABbCccDd", [1,2,3,4]);  // output: ["A", "Bb", "Ccc", "Dd"]
             * DI.divideByNs("ABbCccDddd", [1,2,3]);  // output: ["A", "Bb", "Ccc", "D", "d", "d", "d"]
             * DI.divideByNs("ABbCccDddd", [1,2,3], 2);  // output: ["A", "Bb", "Ccc", "Dd", "dd"]
             */
            divideByNs(str: string, ns: number[], rest: number): string[]


            /**
             * @public
             * @description Divide letters and numbers
             * @param {string} str origin string
             * @param {Array<'N'|'L'|'O'>} filter N: `number`, L: `letter`, O: `other` <br/>
             * declare which group(s) need to be filtered out in the divide process
             * @return {string[]}
             * @example
             * const str = '1jf啊j14+-啊15)4啊'
             * DI.divideByType(str)  // output: ['1', 'jf', '啊', 'j', '14', '+-啊', '15', ')', '4', '啊']
             * DI.divideByType(str, ['O'])  // output: ['1', 'jf', 'j', '14', '15', '4']
             */
            divideByType(str: string, filter: ('N'|'L'|'O')[] = []): string[]
        }
    }
    const DI: DivideIt.DI;
    export = DI;
}