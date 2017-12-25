var router = require('express').Router();

router.get('/', function(req, res, next) {
    return res.json({
        response: 'Hello World'});
});

router.post('/', function(req, res) {
    console.log('got the request:\n' + JSON.stringify(req.body));
    return res.send(req.body);
});

module.exports = router;