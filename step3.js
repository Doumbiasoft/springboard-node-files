const fs = require('fs');
const process = require('process');
const axios = require('axios');
const uft8 = 'utf8';
const http = 'http';
const __out = '--out';

let path, out;

if (process.argv[2] === __out) {

    out = process.argv[3];
    path = process.argv[4];

} else {

    path = process.argv[2];
}

if (path.slice(0, 4) === http) {
    webCat(out,path);
} else {
    cat(out,path);
}

function writeOutput(out,pathOrData) {
    if (out) {
      fs.writeFile(out, pathOrData, uft8, (error) =>{
        if (error) {
            console.error(`Failed to write ${out}: ${error}`);
            process.exit(1);
        }
      });
    } 
    console.log(path);
  }


function cat(out,path){
fs.readFile(path, uft8, (error, data)=> {
    if (error){
        console.error(`Failed to read: ${error}`);
        process.kill(1);
    }
    writeOutput(out,data)
 });
}


async function webCat(out,url){
    try {
        let res = await axios.get(url);
        console.log("The data is:\n",res.data);
        writeOutput(out,res.data)
      } catch (error) {
        console.error(`Failed to get URL ${url}: ${error}`);
        process.exit(1);
      }
    }


    