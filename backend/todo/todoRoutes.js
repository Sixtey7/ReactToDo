'use strict';

const config = require('./config');
const TestQuery = require('./db/TestQuery');
var router = require('express').Router();

let testQuery = new TestQuery(config.pgPool);

router.get('/', function(req, res, next) {
    return res.json({
        response: 'This will eventually return all of the todos!'});
});

router.post('/', function(req, res) {
    console.log('got the todo to insert:\n' + JSON.stringify(req.body));
    return res.send(req.body);
});

router.get('/testGetAll', async function(req, res) {
    try {
        let queryResult = await testQuery.select();
        console.log('got the result\n' + queryResult);
        if (queryResult) {
            return res.json(queryResult)
        }
        else {
            return res.json('No Result!');
        }
    }
    catch (err) {
        console.log('got the error handling testGetAll request:\n' + err)
    }
});

module.exports = router;