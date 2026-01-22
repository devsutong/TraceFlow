//=======================================
//ADD TO GITIGNORE DO NOT PUSH LATER
//PATH FOR FABRIC SERVICES 
//=======================================

const path = require('path');

module.exports = {
    fabricSamplesPath: process.env.fabricSamplesPath
    ? path.resolve(process.env.fabricSamplesPath)
    : path.resolve(__dirname,'../fabric-samples')
}
