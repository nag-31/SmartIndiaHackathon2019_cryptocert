var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAWJKk-lpeb2B0Rj0HSsbz8kYAWE52-_t8",
    authDomain: "cryptocertsuser.firebaseapp.com",
    databaseURL: "https://cryptocertsuser.firebaseio.com",
    projectId: "cryptocertsuser",
    storageBucket: "cryptocertsuser.appspot.com",
    messagingSenderId: "576212006574"
  };
//firebase.initializeApp(config);
const mFirebase = firebase.initializeApp(config);
const database = mFirebase.database();

//SignUp with Email and Password
function createEmailUser(email, password, callback){
    mFirebase.auth().createUserWithEmailAndPassword(email, password).then(callback()).catch(function(error){
        console.log(error);
    });
}

//Login with email and password
function loginWithEmail(email, password, callback){
    mFirebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(usercred){
        //usercred.user.getUid();
        console.log("LoggedIn");
        callback();
    })
    .catch(function(error){
        console.log(error);
        callback(error);
    });
}

//Logout of firebase account
function logout(){
    mFirebase.auth().signOut();
}

//Get Uid
function getUid(){
    return mFirebase.auth().currentUser.uid;
}

//Check Login status
function isLoggedIn(req, res, next){
    //var user = mFirebase.auth().currentUser;
    if(req.session.uid && req.session.type == 'user'){
        return next();
    }
    else{
        res.redirect('/user/login');
    }
}

//Check Login status for login page
function checkLoginPage(req, res, next){
    //var user = mFirebase.auth().currentUser;
    if(req.session.uid == null){
        return next();
    }
    else{
        res.redirect('/user/dashboard');
    }
}

//DB methods

//Add Certificate to database
function addCertToDb(uid, data, callback){
    console.log(data);
    var dataref = database.ref('user/' + uid + '/certificates').push();
    dataref.set(data, function(err){
        if(err){
            console.log(err);
        } else {
            callback();
        }

    });
}

//Get certificates list from db
function getCertListFromDb(uid, callback){
    var dataref = database.ref('user/' + uid + '/certificates');
    var arr = [];
    dataref.once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            arr.push(childData);
          }); 
          callback(arr);       
    });
}


module.exports = {createEmailUser: createEmailUser, loginWithEmail: loginWithEmail, isLoggedIn: isLoggedIn, 
    checkLoginPage: checkLoginPage, logout: logout, addCertToDb: addCertToDb, getCertListFromDb: getCertListFromDb,
    getUid: getUid};