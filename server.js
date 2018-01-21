var express = require("express");
var request = require('request');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var app = express();
var router = express.Router();

var User = require('./serverModels/user');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/weddingMatchDB", function (err) {
    if (err) {
        console.log("Error: " + err);
    }
    else {
        console.log("Connected to MongoDB")
    }
});


// Routes
app.post('/signup', function (req, res, next) {
    var user = new User({
        name: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

app.post('/login', function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ user: user }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});


app.listen(4200,function(){
    console.log("Running on http://localhost:4200");
});