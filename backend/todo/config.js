'use strict';

const config = require('../common/config/config');
const postgres = require('../common/config/postgres');
const CustomPool = require('../common/db/CustomPool');

const c = Object.assign({}, config, postgres());

c.pgPool = new CustomPool(c.postgresql);
c.pgPool.on('error', (err) => console.log(err));
c.closed.then(function() {
    console.log('shutting down the postgresql pool');
    return c.pgPool.end();
});

module.exports = c;
