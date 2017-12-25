'use strict';

const Pool = require('pg-pool');

/* 
* Custom Pool that extends Pool from pg package
*/
class CustomPool extends Pool {

    /**
     * Constructor 
     * @param {Object} postgresConfig The postgres config to use
     */
    constructor(postgresConfig = {}) {
        super(postgresConfig);
        this._maxTries = postgresConfig.maxTries;
        this._retryMillis = postgresConfig.retryMillis;
    }

    async query() {
        //retry every {retryMillis} ms up to a maximum {maxTries}
        for (let i = 0; i <= this._maxTries; i++) {
            try {
                let results = await super.query(...arguments);
                return results;
            }
            catch (err) {
                if (i === this._maxTries) {
                    throw err;
                }
                console.log('Retrying Query ...Attempt' + (i + 1));
            }
            await new Promise(resolve => setTimeout(resolve, this._retryMillis));
        }
    }
}

module.exports = CustomPool;