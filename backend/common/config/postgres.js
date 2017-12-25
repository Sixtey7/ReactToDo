'use strict';

module.exports = function() {
    const config = {
        postgresql: {
            host: 'localhost',
            port: '5432',
            database: 'webapp',
            user: 'webappp',
            password: 'webappp',
            min: 1,
            max: 10,
            idleTimeoutMillis: 10000,
            maxTries: 3,
            retryMillis: 500
        }
    };

    return config;
}