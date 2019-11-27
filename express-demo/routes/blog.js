var express = require('express');
var router = express.Router();

router.get('/list', function (req, res, next) {
    res.json({
        errorno: 0,
        data: [1, 2, 3]
    })
});

router.get('/details', function (req, res, next) {
    // res.setHeader('Content-type','application/json')
    // res.end(JSON.stringify(Data))
    res.json({
        errorno: 0,
        data: 'OK'
    })
});

module.exports = router;
