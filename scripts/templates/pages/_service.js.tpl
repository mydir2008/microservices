import { Model, Service } from '@/utils/decorator/mode-service'
import config from './_config'

@Service('u1', 'get', config.testUrl, '')
@Service('u2', 'post', config.testUrl, '')
@Model('{{module}}')
class _Service{}

export default _Service