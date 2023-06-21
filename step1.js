const fs = require('fs');
const process = require('process');
const uft8 = 'utf8';

function cat(path){
    fs.readFile(path, uft8, (error, data)=> {
        if (error){
            console.error("Reading file failed:",error);
            process.kill(1);
        }
        console.log("File content is:\n",data);
    });
}

cat(process.argv[2]);
