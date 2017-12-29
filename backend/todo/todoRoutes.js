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
    try {
        let result = await todoQuery.insert(req.body);
        return res.json(result);
    }
    catch (err) {
        console.log('got an error attempting to post a new todo!\n' + err);
        return res.status(400).json('error: failed to save todo');
    }
});


router.put('/updateState', async function(req, res) {
    if (typeof req.body.id === 'undefined') {
        console.log('no id was received in updateState!');
        res.status(400).json('error: id is required!');
    }
    else if (typeof req.body.checked === 'undefined') {
        console.log('no state was received in updateState!');
        res.status(400).json('error: state is required!');
    }
    else {
        try {
            console.log('received both an id and a state - processing the request!');
            let result = await todoQuery.updateTodoState({id: req.body.id, checked: req.body.checked});
            return res.send(result);
        }
        catch (err) {
            console.log('got an error attempting to update the state!\n' + err);
            return res.status(400).json('error: failed to update state');
        }
    }
});

router.put('/updateName', async function(req, res) {
    if (typeof req.body.id === 'undefined') {
        console.log('no id was received in updateName!');
        res.status(400).json('error: id is required!');
    }
    else if (typeof req.body.name === 'undefined') {
        console.log('no name was received in updateName!');
        res.status(400).json('error: name is required!');
    }
    else {
        try {
            console.log('received both an id and a name - processing the request!');
            let result = await todoQuery.updateTodoText({id: req.body.id, name: req.body.name});
            return res.send(result);
        }
        catch (err) {
            console.log('got an error attempting to update the name!\n' + err);
            return res.status(400).json('error: failed to update name');
        }
    }
});

router.delete('/', async function(req, res) {
    if (typeof req.body.id === 'undefined') {
        console.log('no id was received in delete!');
        res.status(400).json('error: id is required');
    }
    else {
        try {
            console.log('received a request to delete: ' + req.body.id);
            let result = await todoQuery.deleteTodo(req.body.id);
            return res.send(result);
        }
        catch (err) {
            console.log('got an error attempting to delete a todo!\n' + err);
            res.status(400).json('error: failed to delete todo');
        }
    }
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