const express = require('express'),
    Promotion = require('../models/promotion'),
    utils = require('../utils'),
    enums = require('../enums.json'),
    router = express.Router();

const COLUMNS_NAMES = [
    {name: 'name', title: 'Name'},
    {name: 'type', title: 'Type', options: enums.promotionType},
    {name: 'endDate', title: 'End Date', type: 'date'},
    {name: 'startDate', title: 'Start Date', type: 'date'},
    {name: 'userGroupName', title: 'User Group'}
]

router.route('/')
    .get(async (req, res) => {
        try {
            const {skip, take} = req.query;
            const promotions = await Promotion.find().skip(parseInt(skip)).limit(parseInt(take));
            const newTotalCount = await Promotion.countDocuments();

            res.json({data: promotions, newTotalCount});
        } catch (err) {
            return utils.handleError(err, res);
        }
    })
    .post(async (req, res) => {
        try {
            await Promotion.create(req.body.data);
            res.json('created');
        } catch (err) {
            return utils.handleError(err, res);
        }
    })

router.route('/:id')
    .put(async (req, res) => {
        try {
            let {data} = req.body;
            await Promotion.findByIdAndUpdate(req.params.id, {$set: data}).exec();
            res.json('updated');
        } catch (err) {
            return utils.handleError(err, res);
        }
    })
    .delete(async (req, res) => {
        try {
            await Promotion.findByIdAndDelete(req.params.id).exec();
            res.json('deleted');
        } catch (err) {
            return utils.handleError(err, res);
        }
    })

router.route('/columnsNames')
    .get(async (req, res) => {
        res.json({
            columnsNames: COLUMNS_NAMES
        });
    })

module.exports = router;