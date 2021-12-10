/**
 * @description Split the string into groups of n
 * @param {string} str origin string
 * @param {number} n number of characters in every group
 * @example
 * SI.splitByN("AaBbCcDd", 2);  // output: ["Aa", "Bb", "Cc", "Dd"]
 * SI.splitByN("AaBbCcDdE", 2);  // output: ["Aa", "Bb", "Cc", "Dd", "E"]
 */
const splitByN = (str, n = 1) => {
    if(n <= 0) throw new Error('[SplitIt] "n" must be greater than zero')

    const _res = []
    for(let i = 0; i < Math.ceil(str.length / n); i ++) {
        _res.push(str.slice(i * n, i * n + n))
    }
    return _res
}

/**
 * @description Split the string into groups of [...ns]
 * @param {string} str origin string
 * @param {number[]} ns number of characters in groups(in order)
 * @param {number} rest how to divide the rest of the string
 * @example
 * SI.splitByNs("ABbCcc", [1,2,3]);  // output: ["A", "Bb", "Ccc"]
 * SI.splitByNs("ABbCccDd", [1,2,3,4]);  // output: ["A", "Bb", "Ccc", "Dd"]
 * SI.splitByNs("ABbCccDddd", [1,2,3]);  // output: ["A", "Bb", "Ccc", "D", "d", "d", "d"]
 * SI.splitByNs("ABbCccDddd", [1,2,3], 2);  // output: ["A", "Bb", "Ccc", "Dd", "dd"]
 */
const splitByNs = (str, ns, rest = 1) => {
    if(rest <= 0) throw new Error('[SplitIt] "rest" must be greater than zero')
    if(ns.findIndex((n) => {return n <= 0}) !== -1) throw new Error('[SplitIt] item in "ns" must be greater than zero')

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
 * @description Split letters and numbers
 * @param {string} str origin string
 */
const splitLetterAndNumber = (str) => {
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
            // save new type
            last_type = N_L_O(str[i])
            _res.push(str.slice(str_p, str_p + item_p))
            str_p = str_p + item_p
            item_p = 1
        }
    }
    // the loop will miss the operation of pushing the last group into '_res'
    _res.push(str.slice(str_p, str_p + item_p))

    return _res
}

/**
 * @description Determine whether a character is a number, letter or other character
 * @param {string} char the character to judge
 * @return {'N'|'L'|'O'} N: `number`, L: `letter`, O: `other`
 */
const N_L_O = (char) => {
    if(char.length !== 1) throw new Error('[SplitIt] The length of the parameter is wrong, it can only be 1')
    if(/[0-9]/.test(char)) return 'N'
    else if(/[A-Za-z]/.test(char)) return 'L'
    else return 'O'
}

module.exports = {
    splitByN,
    splitByNs,
    splitLetterAndNumber
}

let a = splitLetterAndNumber('1a>?5R+西’')
console.log(a)
