/**
 * 不为空验证
 * 参考: https://github.com/validatorjs/validator.js/blob/master/src/lib/isEmpty.js
 * @author 聂维
 */
import assertString from './assert-string'

export default function isEmpty(input, exeStr, ignore_whitespace = true) {
    try {
        assertString(input)
    } catch (error) {
        return true
    } 
    const r =  (ignore_whitespace ? input.trim().length : input.length) === 0
    if (r){
        throw new Error(exeStr)
    }
}