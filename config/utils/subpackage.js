const fs = require("fs")
const path = require("path")
const createPages = require('./create-pages')
const pages = []
const roots = [
    {
        root: 'subpackage1',
        name: 'subpackage1',
        pages: [],
        _path: path.join(__dirname, '../../src/subpackage1')
    },
    {
        root: 'subpackage2',
        name: 'subpackage2',
        pages: [],
        _path: path.join(__dirname, '../../src/subpackage2')
    },
    {
        root: 'subpackage3',
        name: 'subpackage3',
        pages: [],
        _path: path.join(__dirname, '../../src/subpackage3')
    },
    {
        root: 'subpackage4',
        name: 'subpackage4',
        pages: [],
        _path: path.join(__dirname, '../../src/subpackage4')
    }
]

function onDecision(file){
    return file.indexOf('_') !== 0
}

module.exports = function () {
    roots.forEach(r => {
        createPages(r._path, null, r.pages, onDecision,null)
    })
    return roots.map(r => ({
        root: r.root,
        name: r.name,
        pages: r.pages,
    }));
}