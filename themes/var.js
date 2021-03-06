/**
 *收集 分发scss变量集合
 * npm run themes varName (不填写默认default)
 */
const path = require('path')
const Mustache = require('mustache');
const fs = require('fs')
const os = require("os")
const cwd = process.cwd()
const args = process.argv;
let srcPath = path.resolve('./src');
let thisPath = path.resolve('./themes/default');
let joinString = '\\'
if(os.type() !== 'Windows_NT'){
    srcPath = srcPath.split(path.sep).join('/')
    thisPath = thisPath.split(path.sep).join('/')
    joinString = '/'
}


//Linux系统上'Linux'
//macOS 系统上'Darwin'
//Windows系统上'Windows_NT'


const fsExistsSync = (path) => {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}

const fileDisplay = (filePath) => {
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
                            // 判断是否是页面样式变量文件
                            if(filedir.indexOf('_var.scss') != -1){
                                // 读取文件内容
                                let content = fs.readFileSync(filedir, 'utf-8');
                                if(thisPath === filePath){
                                    let isdirPath = fsExistsSync(filedir)
                                    if(isdirPath){
                                        fs.writeFileSync(filedir.replace(thisPath,srcPath), content, 'utf-8');
                                    }
                                }else{
                                    //是否创建目录
                                    let filedirPath = filedir.replace(srcPath + joinString,'')
                                    filedirPath = filedirPath.replace(joinString + '_var.scss','').split(joinString)
                                    let dirPath = thisPath
                                    if(filedirPath[0] !== '_var.scss'){
                                        filedirPath.forEach((dir)=>{
                                            dirPath = dirPath + joinString + dir
                                            let isdirPath = fsExistsSync(dirPath)
                                            if(!isdirPath){
                                                //判断文件路径内是否带'_var.scss'
                                                fs.mkdirSync(dirPath)
                                            }
                                        })
                                    }
                                    if(filedirPath)
                                    fs.writeFileSync(filedir.replace(srcPath, thisPath), content, 'utf-8');
                                }
                            }
                        }
                        if(isDir){
                            //递归，如果是文件夹，就继续遍历该文件夹下面的文件
                            fileDisplay(filedir);
                        }
                    }
                })
            })
        }
    })
}

//console.log(args[2]) //dis:分发 col:收集
if(args[2] === 'dis'){
    //dis:分发
    fileDisplay(thisPath)
}else{
    //col:收集
    fileDisplay(srcPath)
}
//fileDisplay(srcPath) //提取页面内所有_var.scss文件到themes

//分发所有_var.scss文件到页面 同理,但不需要判断路径是否存在(路径不存在不处理)

//同步写入 writeFileSync

//同步追加 appendFileSync