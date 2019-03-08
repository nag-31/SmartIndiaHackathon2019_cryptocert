const express   = require('express'),
      router    = express.Router(),
      fHelper   = require('../firebase/firebase-user'),
      fIHelper  = require('../firebase/firebase-issuer'),
      contract  = require('../contract'),
      fileHandler = require('../modules/file-handler');

const signoutlink = '/user/logout';

router.get('/login', fHelper.checkLoginPage, function(req, res){
    res.render('login', {title: 'User', action: '/user/login', signoutlink: ''});
});

router.post('/login', function(req, res){
    fHelper.loginWithEmail(req.body.email, req.body.password, function(err){
        if(err){
            return res.send('Invalid Credentials!!');
        }
        req.session.uid = fHelper.getUid();
        req.session.type = 'user';
        res.redirect('/user/dashboard'); 
    });
});

router.get('/logout', function(req, res){
    fHelper.logout();
    req.session.uid = null;
    req.session.type = null;
    res.redirect('/');
});

router.get('/signup', function(req, res){
    res.render('usersignup', {title: 'User', signoutlink: ''});
});

router.post('signup', function(req, res){
    fHelper.createEmailUser(req.body.email, req.body.password, function(){
        res.send('User created successfully!');
    });
});


router.get('/dashboard', fHelper.isLoggedIn, function(req, res){
    fHelper.getCertListFromDb(req.session.uid, function(certs){
        res.render('userdash', {title: 'Dashboard', certs: certs, signoutlink: signoutlink});
    });
});

router.get('/cert/:address', fHelper.isLoggedIn, function(req, res){
    contract.getDeployedContract(req.params.address, function(cert){
        cert.downloadlink = req.params.address + '/downloadverify/'; 
        res.render('certificate', {title: 'Certificate', signoutlink: signoutlink, cert: cert});
    });
});

router.get('/cert/add/:address/:issueruid', fHelper.isLoggedIn, function(req, res){
    var address = req.params.address;
    contract.getDeployedContract(address, function(data){
        fIHelper.getKeysFromDb(req.params.issueruid, function(keys){
            var pubKey = keys.PUBLIC;
            var dbData = {issuer: data.college, degree: data.degree, address: address, PUBLIC: pubKey};
            fHelper.addCertToDb(req.session.uid, dbData, function(){
                res.redirect('/user/dashboard');
            });
        });
        
    });
});

router.get('/cert/:address/downloadverify', fHelper.isLoggedIn, function(req, res){
    fHelper.getCertListFromDb(req.session.uid, function(certs){
        certs.forEach(function(cert){
            if(cert.address == req.params.address){
                var data = {address: cert.address, publickey: cert.PUBLIC};
                fileHandler.createVerifyFile(data, function(){
                    res.download('./temp/verify.json');
                    //fileHandler.deleteVerifyFile();
                });
            }
        });
    });
});

module.exports = router;