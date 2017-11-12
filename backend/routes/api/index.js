var router = require('express').Router();

router.use('/helloworld', require('./helloWorld'));

module.exports = router;