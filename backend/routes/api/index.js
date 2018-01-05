'use strict';

const express = require('express');
const router = new express.Router();

router.use('/helloworld', require('./helloWorld'));
router.use('/todo', require('../../todo/todoRoutes'));

module.exports = router;
