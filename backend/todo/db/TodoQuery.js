'use strict';

const dbSchema = 'todo';
class TodoQuery {
    /**
     * The name of the table
     */
    static get table() {
        return `${dbSchema}.todos`;
    }

    constructor(pool) {
        if (typeof pool !== 'object') {
            throw new TypeError('pool is required!');
        }
        this._pool = pool;
    }

    /**
     * The connection pool
     */
    get pool() {
        return this._pool;
    }

    /**
     * Creates the table if it does not exist
     * @returns {Promise} A Promise that resolves or rejects with the result of the query
     */
    async createTable() {
        await this._pool.query(`create schema if not exists ${dbSchema}`);
        let query = `create table if not exists ${TodoQuery.table} (
            id integer primary key,
            name text
        )`;
        console.log('running the query\n' + query);
        return this._pool.query(query);
    }

    /**
     * Drop the table if it exists.
     * @returns {Promise} A Promise that resovles or rejects with the result of hte query
     */
    dropTable() {
        return this._pool.query(`drop table if exists ${TodoQuery.table}`);
    }

    /**
     * Insert a todo
     * @param {Object} data the todo to insert
     * @returns {Promise} A Promise that resolves with the inserted object
     */
    async insert(data) {
        console.log('inserting the todo:\n' + JSON.stringify(data));

        if (typeof data !== 'object') {
            throw new TypeError('data is required');
        }
        //if we wanted to validate, now's the time
        let text = `insert into ${TodoQuery.table} (id, name) values($1, $2)`;
        let values = [data.id, data.name];
        await this._pool.query({text, values});
        return data;
    }

    /**
     * Selects all of the todos
     * @returns {Promise} A Promise that resolves with all of the todos
     */
    async select() {
        let text = `select * from ${TodoQuery.table}`;
        
        let result = await this._pool.query(text);

        console.log('got:\n' + result.rows.length);
        return result.rows;
    }
}

module.exports = TodoQuery;