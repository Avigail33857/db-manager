const express = require("express"),
    router = express.Router(),
    promotions = require('./promotionsController');

router.use('/promotions', promotions);

module.exports = router;