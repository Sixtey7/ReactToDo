'use strict';

const CustomPool = require('../db/CustomPool');
const postgresConfig = require('./postgres').postgresql;

const config = {
    pgPool: new CustomPool(postgresConfig)
};

config.pgPool.on('error', (err) => console.log(err));

// NOTE: if we make a common config, this should be moved
config.closed = new Promise(resolve => {
    config.close = function() {
        console.log('shutting down postgres pool');
        config.pgPool.end();

        resolve();

        return config.closed;
    };
});

module.exports = config;
