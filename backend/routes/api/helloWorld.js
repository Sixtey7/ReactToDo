var router = require('express').Router();

router.get('/', function(req, res, next) {
    return res.json({
        response: 'Hello World'});
});

module.exports = router;