'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Vendor = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyField: { type: String, required: true },
    companyPhone: { type: String, required: true },
    companyEmail: { type: String },
    companyWebsite: { type: String },
    companyFacebook: { type: String },
    companyInstagram: { type: String },
    companyAddress: { type: String },
    companyLogo: { type: String },
    vendorImage: { type: String }
});


Vendor.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('Vendor', Vendor);