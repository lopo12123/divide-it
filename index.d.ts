declare module 'split-it' {
    namespace SplitIt {
        interface SI {
            /**
             * @description Split the string into groups of n
             * @param {string} str origin string
             * @param {number} n number of characters in every group
             * @return {string[]}
             * @example
             * SI.splitByN("AaBbCcDd", 2);  // output: ["Aa", "Bb", "Cc", "Dd"]
             * SI.splitByN("AaBbCcDdE", 2);  // output: ["Aa", "Bb", "Cc", "Dd", "E"]
             */
            splitByN(str: string, n: number): string[]

            /**
             * @description Split the string into groups of [...ns]
             * @param {string} str origin string
             * @param {number[]} ns number of characters in groups(in order)
             * @param {number} rest how to divide the rest of the string
             * @return {string[]}
             * @example
             * SI.splitByNs("ABbCcc", [1,2,3]);  // output: ["A", "Bb", "Ccc"]
             * SI.splitByNs("ABbCccDd", [1,2,3,4]);  // output: ["A", "Bb", "Ccc", "Dd"]
             * SI.splitByNs("ABbCccDddd", [1,2,3]);  // output: ["A", "Bb", "Ccc", "D", "d", "d", "d"]
             * SI.splitByNs("ABbCccDddd", [1,2,3], 2);  // output: ["A", "Bb", "Ccc", "Dd", "dd"]
             */
            splitByNs(str: string, ns: number[], rest: number): string[]

            /**
             * @description Split letters and numbers
             * @param {string} str origin string
             * @param {('N'|'L'|'O')[]} filter N: `number`, L: `letter`, O: `other` <br/>
             * declare which group(s) need to be filtered out in the split process
             * @example
             * const str = '1jf啊j14+-啊15)4啊'
             * SI.splitByLetterAndNumber(str)  // output: ['1', 'jf', '啊', 'j', '14', '+-啊', '15', ')', '4', '啊']
             * SI.splitByLetterAndNumber(str, ['O'])  // output: ['1', 'jf', 'j', '14', '15', '4']
             */
            splitByType(str: string, filter: ('N'|'L'|'O')[] = []): string[]
        }
    }
    const SI: SplitIt.SI;
    export = SI;
}