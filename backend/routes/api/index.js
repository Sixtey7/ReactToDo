'use strict';

const router = require('express').Router();

router.use('/helloworld', require('./helloWorld'));
router.use('/todo', require('../../todo/todoRoutes'));

module.exports = router;
