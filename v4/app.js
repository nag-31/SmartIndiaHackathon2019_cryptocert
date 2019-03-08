const port = 5457;
const express           = require('express'),
      bodyParser        = require('body-parser'),
      userRoutes        = require('./routes/user'),
      issuerRoutes      = require('./routes/issuer'),
      verifyRoutes      = require('./routes/verify'),
      session    = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set("view engine", "ejs");

app.get('/', function(req, res){
    res.render('landing', {title: 'Home', signoutlink: ''});
});

//Routes
app.use('/user', userRoutes);
app.use('/issuer', issuerRoutes);
app.use('/verify', verifyRoutes);


app.listen(port, function () {
	console.log("App Srarted!!");
});