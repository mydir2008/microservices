/**
 * 是否为字符串验证
 * 参考: https://github.com/validatorjs/validator.js/blob/master/src/lib/util/assertString.js
 * @author 聂维
 */
export default function(input, exeStr){
    const isString = (typeof input === 'string' || input instanceof String);
    if (!isString){
        throw new Error(exeStr)
    }
}