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
var Vendor = require('./serverModels/vendor');

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

// Register
app.post('/signup', function (req, res, next) {
    var user = new User({
        name: req.body.fullName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred with sign up',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

app.post('/signupvendor', function (req, res, next) {
    var vendor = new Vendor({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        companyName: req.body.companyName,
        companyField: req.body.companyField,
        companyPhone: req.body.companyPhone,
        companyEmail: req.body.companyEmail,
        companyWebsite: req.body.companyWebsite,
        companyFacebook: req.body.companyFacebook,
        companyInstagram: req.body.companyInstagram,
        companyLogo: "",
        vendorImage: ""

    });
    vendor.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Vendor created',
            obj: result
        });
    });
});

// Login
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

app.post('/vendorlogin', function (req, res, next) {
    Vendor.findOne({ email: req.body.email }, function (err, vendor) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!vendor) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        if (!bcrypt.compareSync(req.body.password, vendor.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: { message: 'Invalid login credentials' }
            });
        }
        var token = jwt.sign({ vendor: vendor }, 'secret', { expiresIn: 7200 });
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: vendor._id
        });
    });
});

//Profile Edit




app.listen(4200,function(){
    console.log("Running on http://localhost:4200");
});