'use strict';
const upath = require('upath');
const sh = require('shelljs');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');
const distPath = upath.resolve(upath.dirname(__filename), '../dist');

sh.find(srcPath).forEach(_processFile);

function _processFile(filePath) {
    // Compile pug files as before
    if (
        filePath.match(/\.pug$/)
        && !filePath.match(/include/)
        && !filePath.match(/mixin/)
        && !filePath.match(/\/pug\/layouts\//)
    ) {
        renderPug(filePath);
        return;
    }

    // Copy plain HTML files from src/ root directly to dist/
    if (
        filePath.match(/\.html$/)
        && !filePath.match(/\/pug\//)
        && !filePath.match(/\/assets\//)
    ) {
        const filename = upath.basename(filePath);
        sh.cp(filePath, upath.join(distPath, filename));
    }
}