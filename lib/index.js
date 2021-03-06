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
const divideByN = (str, n = 1) => {
    if(n <= 0) throw new Error('[DivideIt] "n" must be greater than zero')

    const _res = []
    for(let i = 0; i < Math.ceil(str.length / n); i ++) {
        _res.push(str.slice(i * n, i * n + n))
    }
    return _res
}

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
const divideByNs = (str, ns, rest = 1) => {
    if(rest <= 0) throw new Error('[DivideIt] "rest" must be greater than zero')
    if(ns.findIndex((n) => {return n <= 0}) !== -1) throw new Error('[DivideIt] item in "ns" must be greater than zero')

    const _res = []
    let str_p = 0
    let ns_p = 0
    for(let i = 0; i < str.length; i ++) {
        _res.push(
            str.slice(
                str_p,
                str_p + ((ns_p < ns.length) ? ns[ns_p] : rest)
            )
        )
        str_p += (ns_p < ns.length) ? ns[ns_p] : rest
        ns_p += (ns_p < ns.length) ? 1 : 0
        i = str_p
    }
    return _res
}

/**
 * @public
 * @description Divide letters and numbers
 * @param {string} str origin string
 * @param {Array<'N'|'L'|'O'>} filter N: `number`, L: `letter`, O: `other` <br/>
 * declare which group(s) need to be filtered out in the divide process
 * @return {string[]}
 * @example
 * const str = '1jf???j14+-???15)4???'
 * DI.divideByType(str)  // output: ['1', 'jf', '???', 'j', '14', '+-???', '15', ')', '4', '???']
 * DI.divideByType(str, ['O'])  // output: ['1', 'jf', 'j', '14', '15', '4']
 */
const divideByType = (str, filter = []) => {
    const _res = []
    let str_p = 0
    let item_p = 1
    let last_type = N_L_O(str[0])
    for(let i = 1; i < str.length; i ++) {
        // same type - continue
        if(N_L_O(str[i]) === last_type) {
            item_p += 1
        }
        // different type - divide
        else {
            // save new type and ignore then if typeName in filter
            if(!filter.includes(last_type)) {
                _res.push(str.slice(str_p, str_p + item_p))
            }
            last_type = N_L_O(str[i])
            str_p = str_p + item_p
            item_p = 1
        }
    }
    // the loop will miss the operation of pushing the last group into '_res'
    // but it still has to obey the rule of filter
    if(!filter.includes(last_type)) {
        _res.push(str.slice(str_p, str_p + item_p))
    }

    return _res
}

/**
 * @private
 * @description Determine whether a character is a number, letter or other character
 * @param {string} char the character to judge
 * @return {'N'|'L'|'O'} N: `number`, L: `letter`, O: `other`
 */
const N_L_O = (char) => {
    if(char.length !== 1) throw new Error('[DivideIt] The length of the parameter is wrong, it can only be 1')
    if(/[0-9]/.test(char)) return 'N'
    else if(/[A-Za-z]/.test(char)) return 'L'
    else return 'O'
}

module.exports = {
    divideByN,
    divideByNs,
    divideByType
}
