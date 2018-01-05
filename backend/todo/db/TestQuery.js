'use strict';

/**
 * Class used to interact with the Test Table
 */
class TestQuery {
    /**
     * The name of the table
     * @returns {string} the name of the table
     * @static
     */
    static get table() {
        return 'testtable';
    }

    /**
     * Creates a new instance of the TestQuery object
     * @param {pg-pool} pool the pg-pool instance to use
     */
    constructor(pool) {
        if (typeof pool !== 'object') {
            throw new TypeError('pool is required!');
        }
        this._pool = pool;
    };

    /**
     * The connection pool
     * @type {Pool}
     */
    get pool() {
        return this._pool;
    }

    /**
     * Returns all of the entries in the test table
     * @returns {Promise} a promise resolving to the result of the query
     */
    async select() {
        let text = `select * from ${TestQuery.table}`;
        console.log('build the query\n' + text);
        let result = await this._pool.query(text);
        console.log('Got ' + result.rows.length + ' rows back!');

        return result.rows;
    }
}

module.exports = TestQuery;
