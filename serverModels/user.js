'use strict';

var debug = require('debug');
var error = debug('reportModel:error');
var log = debug('reportModel:log');

var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var User = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    vendors: [{ type: Schema.Types.ObjectId, ref: 'Vendors' }],
    recommended: [{ type: Schema.Types.ObjectId, ref: 'Recommended' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }],
    weddingDate: { type: String },
    weddingLocation: { type: String },
    userImage: { type: String }
});


User.set('toJSON', {
    transform: function (doc, ret, options) {
        return ret;
    }
});

module.exports = mongoose.model('User', User);