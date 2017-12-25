'use strict';

class TestQuery {
    /**
     * The name of the table
     */
    static get table() {
        return 'testtable';
    }
    
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

    async select() {
        let text = `select * from ${TestQuery.table}`;
        console.log('build the query\n' + text);
        let result = await this._pool.query(text);
        console.log('Got ' + result.rows.length + ' rows back!');

        return result.rows;
    }
}

module.exports = TestQuery;