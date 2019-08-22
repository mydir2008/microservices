/**
 * 手机号验证
 * 参考: https://github.com/validatorjs/validator.js/blob/master/src/lib/isMobilePhone.js
 * @author 聂维
 * @email stevennie@aliyun.com
 */
import assertString from './assert-string'

const rule = /^((\+|00)86)?1([358][0-9]|4[579]|6[67]|7[0135678]|9[189])[0-9]{8}$/
export default function(input, exeStr){
    try {
        assertString(input)
    } catch (error) {
        return true
    }
    if (!(rule.test(input))){
        throw new Error(exeStr) 
    }
}