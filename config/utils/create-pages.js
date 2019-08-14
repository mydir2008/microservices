
const fs = require("fs")
const path = require("path")

function createPages (root, wxpathPrefix, pages, onDecision,path){
    const p = root
    const startPath = !wxpathPrefix ? '' : wxpathPrefix + '/'
    const files = fs.readdirSync(p)
    files.forEach(element => {
        //文件或目录名称包含_都会被忽略
        if (!onDecision(element)){
            return
        }
        const cp = p + '/' + element
        let stat = fs.lstatSync(cp);
        if (stat.isDirectory()){
            createPages(cp, startPath + element, pages, onDecision,path)
        } else {
            if (element.slice(-3) !== '.js'){
                return
            }
            const _page = element.substring(0, element.lastIndexOf('\.'))
            console.log('构建page:' + startPath + _page)
            let pagepath = startPath + _page
            if(pagepath === path){
                pages.unshift(startPath + _page)
            }else{
                pages.push(startPath + _page)
            }
            
        }
    })
    //写文件
}

module.exports = createPages