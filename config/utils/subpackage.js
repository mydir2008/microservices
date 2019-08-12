const fs = require("fs")
const path = require("path")
const createPages = require('./create-pages')
const pages = []
//let roots = []
const subpackage = [path.join(__dirname, '../../src/subpackage1'),path.join(__dirname, '../../src/subpackage2'),path.join(__dirname, '../../src/subpackage3'),path.join(__dirname, '../../src/subpackage4')]
let subpackageConfig = []

const fileDisplay = (filePath,i) => {
    let readDir = fs.readdirSync(filePath);
    readDir.forEach(function(filename){
        let filedir = path.join(filePath, filename);
        let fileStat = fs.statSync(filedir)
        if(fileStat){
            let isDir = fileStat.isDirectory();//是文件夹
            if(isDir){
                //是文件夹添加子包
                subpackageConfig.push({
                    root: "subpackage" + (i + 1),
                    name: "subpackage" + (i + 1),
                    pages: [],
                    _path: path.join(__dirname, "../../src/subpackage" + (i + 1))
                })
            }
        }
    })
}

for(let i = 0;i<subpackage.length;i++){
    fileDisplay(subpackage[i],i)
}

function onDecision(file){
    return file.indexOf('_') !== 0
}

module.exports = function () {
    subpackageConfig.forEach(r => {
        createPages(r._path, null, r.pages, onDecision,null)
    })
    return subpackageConfig
}