import { createModel } from '@/utils/create-model'
import Service from './_service'
const defModel = Service.__createModel__()

//扩展model
/**
 * defModel.effects.helloword = function * ({ payload, callback }, { select, call, put }){
 *      try{
 *          const resp = yield call(Service.method, payload)
 *          yield put({
 *              type: 'save',
 *              payload:{
 *                  data: resp
 *              }
 *          })
 *          callback && callback(resp, true)
 *      }catch(error){
 *          callback && callback(error, false)
 *      }
 * }
 */

createModel(defModel)