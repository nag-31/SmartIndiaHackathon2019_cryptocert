const express     = require('express'),
      router      = express.Router(),
      contract    = require('../contract'),
      signature   = require('../signature'),
      fs          = require('fs'),
      multer      = require('multer');

const upload      = multer({ dest: 'temp/' });

router.get('/', function(req, res){
    res.render('verify', {title: 'Verify', signoutlink: ''});
});

router.post('/', upload.single('verifyfile'), function(req, res){
    if(req.file){
        console.log(req.file.originalname);
        console.log(req.file.path);
        //Read data from filr
        fs.readFile(req.file.path, 'utf-8', function(err, data){
            //Convert data to JSON format
            console.log(data);
            var fileJson = JSON.parse(data);
            //Delete file after getting data
            fs.unlink(req.file.path, function(err){
                console.log(err);
            });
            //Get contract from account no
            contract.getDeployedContract(fileJson.address, function(data){
                var dataStr = data.name + data.degree + data.college + data.score + data.batch;
                console.log('Datastr' + dataStr);
                //Verify certificate
                signature.verifySign(dataStr, fileJson.publickey, data.sign, function(verify){
                    if(verify == true){
                        res.render('verify', {title: 'Verify', signoutlink: '', data: data});
                    } else {
                        res.send('Not Verified!');
                    }
                });
            });
        });
    } else {
        console.log('File upload failed');
    }
});


module.exports = router;