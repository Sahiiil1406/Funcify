#!/root/.nvm/versions/node/v20.18.1/bin/node
const {copyFolderOrFileToCode}=require('./copyfile.js')
const {authCli}=require('./auth.js')
const {deployFunction}=require('./deploy.js')
console.log("Funcify command line working ...")

const token=null;
token=authCli(temp,token).token;



