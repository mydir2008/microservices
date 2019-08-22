/**
 * 币种格式化
 * 
 * @author 聂维
 * @email stevennie@aliyun.com
 */
import numeral from 'numeral'

const FORMATE_STRING = '0,0.[00]'
const DOIT_REG = /,/g
const ROUND_FN = (v) => { return parseInt(+v) }

function format(v) {
    if (!v) {
        return v;
    }
    const _v = v.replace(DOIT_REG, '')
    let formatV = numeral(_v).format(FORMATE_STRING, ROUND_FN)

    if (v[v.length - 1] === '.') {
        formatV = formatV + '.'
    }
    return formatV
}

export default format