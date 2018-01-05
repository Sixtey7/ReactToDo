const express = require('express');
const bodyParser = require('body-parser');

// TODO: want to move
const cores = require('cors');

// const config = require('./common/config/config');
require('./common/config/config');

const app = express();

app.use(cores());
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World 2!'));

app.use(require('./routes'));


app.listen(3002, () => console.log('Example app listening on port 3002!'));
