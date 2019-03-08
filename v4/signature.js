const crypto = require('crypto');
const keys = require('./keys');

//Generate keys
function generateKeys(callback){
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', 
        {   modulusLength: 1024,  // the length of your key in bits   
            publicKeyEncoding: {
            type: 'spki',       // recommended to be 'spki' by the Node.js docs
            format: 'pem'   
            },   
            privateKeyEncoding: {
            type: 'pkcs8',      // recommended to be 'pkcs8' by the Node.js docs
            format: 'pem',
            //cipher: 'aes-256-cbc',   // *optional*
            //passphrase: 'top secret' // *optional*   
        } 
    }); 
    callback(publicKey, privateKey);
    
}

//Create sign
function createSign(data, privateKey, callback){
    const sign = crypto.createSign('SHA256');
    sign.write(data);
    sign.end();
    const signature = sign.sign(privateKey, 'hex');
    callback(signature);
}

//Verify sign
function verifySign(data, publicKey, signature, callback){
    const verify = crypto.createVerify('SHA256');
    verify.write(data);
    verify.end();
    callback(verify.verify(publicKey, signature, 'hex'));
}

// generateKeys(function(pub, pri){
//     const data = 'sdfsdfadfsadszdvasd';
//     createSign(data, pri, function(sign){
//         console.log(sign);
//         verifySign(data, pub, sign, function(verify){
//             console.log(verify);
//         });
//     });
// });

module.exports = {createSign: createSign, generateKeys: generateKeys, verifySign: verifySign};