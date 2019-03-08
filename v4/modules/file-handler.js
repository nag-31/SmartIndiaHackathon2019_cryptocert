const fs = require('fs');

function createVerifyFile(data, callback){
    var json = JSON.stringify(data);
    fs.writeFile('./temp/verify.json', json, function(err){
        if(err){
            console.log(err);
        } else{
            console.log('Created verify.json');
            callback();
        }
    });
}

function deleteVerifyFile(){
    fs.unlink('./temp/verify.json', function(err){
        if(err){
            console.log(err);
        }
    });
}



// var x = {accountno: '345324632463546356', publickey: '345346rsd4tefsdscz'};

// createVerifyFile(x, function(){

// });

module.exports = {createVerifyFile: createVerifyFile, deleteVerifyFile: deleteVerifyFile}