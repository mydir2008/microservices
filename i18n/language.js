const path = require('path')
const Mustache = require('mustache');
const fs = require('fs')
const cwd = process.cwd()
const args = process.argv;

const srcPath = path.resolve('./src');
const thisPath = path.resolve('./i18n');

const fileDisplay = (filePath,type) => {
    let ans = {};
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                let filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        let isFile = stats.isFile();//是文件
                        let isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            if(filedir.indexOf('_locale.js') != -1){
                                if(type === 'dis'){
                                    //分发
                                    let content = fs.readFileSync(filedir, 'utf-8');
                                    let aggregate = fs.readFileSync(thisPath + '/config.json', 'utf-8');
                                    try {
                                        content = JSON.parse(content.replace('export default',''))
                                    } catch (error) {
                                        console.warn(filedir + '必须是object类型');
                                    }
                                    try {
                                        aggregate = JSON.parse(aggregate)
                                    } catch (error) {
                                        console.warn('config.json必须是object类型');
                                    }
                                    let firstdir = filedir.indexOf('src\\'),enddir = filedir.indexOf('\\_locale.js');
                                    let subkey = filedir.substring(firstdir+4,enddir)
                                    if(aggregate[subkey.replace('\\','_')]){
                                        fs.writeFileSync(filedir, 'export default ' + JSON.stringify(Object.assign(aggregate[subkey.replace('\\','_')], content),null, 4), 'utf-8');
                                    }
                                }else{
                                    //收集
                                    let content = fs.readFileSync(filedir, 'utf-8');
                                    let aggregate = {}
                                    try {
                                        content = JSON.parse(content.replace('export default',''))
                                    } catch (error) {
                                        console.warn(filedir + '必须是object类型');
                                    }
                                    let firstdir = filedir.indexOf('src\\'),enddir = filedir.indexOf('\\_locale.js');
                                    let subkey = filedir.substring(firstdir+4,enddir)
                                    aggregate[subkey.replace('\\','_')] = content
                                    fs.writeFileSync(thisPath + '/config.json', JSON.stringify(aggregate,null, 4), 'utf-8');
                                }
                            }
                        }
                        if(isDir){
                            //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            fileDisplay(filedir,args[2]);
                        }
                    }
                })
            })
        }
    })
}
//args[2] === 'dis'?分发:收集
fileDisplay(srcPath,args[2])