const fs = require('fs');
const process = require('process');
const axios = require('axios');
let path = process.argv[2];
const uft8 = 'utf8';
const http = 'http';


function cat(path){
fs.readFile(path, uft8, (error, data)=> {
    if (error){
        console.error(`Failed to read: ${error}`);
        process.kill(1);
    }
    console.log("File content is:\n",data);
 });
}


async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log("The data is:\n",res.data);
      } catch (error) {
        console.error(`${url}: ${error}`);
        process.exit(1);
      }
    }


if (path.slice(0, 4) === http) {
    webCat(path);
} else {
    cat(path);
}
    