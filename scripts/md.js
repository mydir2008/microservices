/**
 * 创建页面模板
 * npm run create:page m:页面路径
 */
const path = require('path')
const Mustache = require('mustache');
const fs = require('fs')
const cwd = process.cwd()
const args = process.argv;
if (args.length !== 3 || !args[2]){
    console.log('[npm run create:page]: 命令参数格式不正确')
    return
}
const type = args[2].split('\:')[0]
const modulePath = args[2].split('\:')[1]
let relativeGlobalVarLessPath = modulePath.split('\/').map(r => '../').join('')
const namespace = modulePath.replace(/\//g, '') + '_index'
let componentName = modulePath.replace(/\//g, '') + '_index'
componentName = componentName[0].toLocaleUpperCase() + componentName.substring(1,componentName.length)

//tpls
const configJsTpl = fs.readFileSync(path.join(__dirname, './templates/pages/_config.js.tpl'), 'utf-8');
const modelJsTpl = fs.readFileSync(path.join(__dirname, './templates/pages/_model.js.tpl'), 'utf-8');
const serviceJsTpl = fs.readFileSync(path.join(__dirname, './templates/pages/_service.js.tpl'), 'utf-8');
const indexJsTpl = fs.readFileSync(path.join(__dirname, './templates/pages/index.js.tpl'), 'utf-8');
const indexLessTpl = fs.readFileSync(path.join(__dirname, './templates/pages/index.scss.tpl'), 'utf-8');
const varLessTpl = fs.readFileSync(path.join(__dirname, './templates/pages/_var.less.tpl'), 'utf-8');
const localeTpl = fs.readFileSync(path.join(__dirname, './templates/pages/_locale.js.tpl'), 'utf-8');

let p
if (type === 'm'){ //在主包下创建页面
    p = path.join(cwd, './src/pages/' + modulePath)
} else {
    relativeGlobalVarLessPath = relativeGlobalVarLessPath + '../'
}

if (type === 's1'){
    p = path.join(cwd, './src/subpackage1/' + modulePath)
}
if (type === 's2'){
    p = path.join(cwd, './src/subpackage2/' + modulePath)
}
if (type === 's3'){
    p = path.join(cwd, './src/subpackage3/' + modulePath)
}
if (type === 's4'){
    p = path.join(cwd, './src/subpackage4/' + modulePath)
}
if (!p){
    console.log('[npm run create:page]: 命令参数格式不正确')
    return
}
if (fs.existsSync(p)){
    console.log('[npm run create:page]: 页面已经存在')
    return
}
//创建目录
fs.mkdirSync(p, {recursive: true})

const tplContext = { module: namespace,component:componentName, relativeGlobalVarLessPath: relativeGlobalVarLessPath }

const configJsTplContent = Mustache.render(configJsTpl, tplContext)
const modelJsTplContent = Mustache.render(modelJsTpl, tplContext)
const serviceJsTplContent = Mustache.render(serviceJsTpl, tplContext)
const indexJsTplContent = Mustache.render(indexJsTpl, tplContext)
const indexLessTplContent = Mustache.render(indexLessTpl, tplContext)
const varLessTplContent = Mustache.render(varLessTpl, tplContext)
const localeTplContent = Mustache.render(localeTpl, tplContext)

fs.writeFileSync(p + '/_config.js', configJsTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/_config.js')
fs.writeFileSync(p + '/_model.js', modelJsTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/_model.js')
fs.writeFileSync(p + '/_service.js', serviceJsTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/_service.js')
fs.writeFileSync(p + '/index.js', indexJsTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/index.js')
fs.writeFileSync(p + '/index.scss', indexLessTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/index.scss')
fs.writeFileSync(p + '/_var.scss', varLessTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/_var.scss')
fs.writeFileSync(p + '/_locale.js', localeTplContent, 'utf-8');
console.log('[npm run create:page]: 创建' + p + '/_locale.js')