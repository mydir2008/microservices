const fs = require("fs")
const path = require("path")
const createPages = require('./create-pages')

const pages = []
const root = path.join(__dirname, '../../src/pages')

function onDecision(file){
    return file.indexOf('_') !== 0
}

module.exports = function () {
    createPages(root, 'pages', pages, onDecision,'pages/index/index')
    return pages
}