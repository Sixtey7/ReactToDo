const express = require('express');

var cores = require('cors');

const app = express();

app.use(cores());

app.get('/', (req, res) => res.send('Hello World 2!'));

app.use(require('./routes'));


app.listen(3002, () => console.log('Example app listening on port 3002!'));