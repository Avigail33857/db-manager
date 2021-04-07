"use strict";
const mongoose = require('mongoose'),
    enums = require('../enums.json');

const promotion = new mongoose.Schema({
    name: {type: String, required: true},
    type: {
        type: String,
        required: true,
        enum: Object.values(enums.promotionType)
    },
    startDate: {type: Date, default: new Date()},
    endDate: {type: Date, default: new Date()},
    userGroupName: {type: String, required: true}
});

module.exports = mongoose.model('promotion', promotion);


