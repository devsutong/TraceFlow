//=======================================
//ADD TO GITIGNORE DO NOT PUSH LATER
//PATH FOR FABRIC SERVICES 
//=======================================

const path = require('path');

const FABRIC_SAMPLES_DEFAULT = path.resolve(__dirname, '../../../fabric-samples');

module.exports = {
  fabricSamplesPath: process.env.FABRIC_SAMPLES_PATH
    ? path.resolve(process.env.FABRIC_SAMPLES_PATH)
    : FABRIC_SAMPLES_DEFAULT,
};