'use strict';

const config = require('./config');
const TestQuery = require('./db/TestQuery');
const TodoQuery = require('./db/TodoQuery');

var router = require('express').Router();

let testQuery = new TestQuery(config.pgPool);
let todoQuery = new TodoQuery(config.pgPool);

let response = todoQuery.createTable();

router.get('/', async function(req, res, next) {
    let result = await todoQuery.select();
    return res.json(result);
});

router.post('/', async function(req, res) {
    //console.log('got the todo to insert:\n' + JSON.stringify(req.body));
    let result = await todoQuery.insert(req.body);
    return res.send(result);
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