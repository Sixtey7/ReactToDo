'use strict';

const dbSchema = 'todo';
/**
 * Class that performs database operations for Todo
 */
class TodoQuery {
    /**
     * Function to obtain the name of the table
     * @return {string} the name of the table
     * @static
     */
    static get table() {
        return `${dbSchema}.todos`;
    };

    /**
     * Creates a new instance of the TodoQuery object
     * @param {pg-pool} pool - pg-pool object to use
     */
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
            name text,
            checked boolean
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
        // if we wanted to validate, now's the time
        let text = `insert into ${TodoQuery.table} (id, name, checked) values($1, $2, $3)`;
        let values = [data.id, data.name, data.checked];
        await this._pool.query({text, values});
        return data;
    }

    /**
     * Update the state of an existing todo
     * @param {Object} data - object containing an id and a checked state to update
     * @returns {Promise} promise resolving to the response from the database
     **/
    async updateTodoState(data) {
        if (typeof data !== 'object') {
            throw new TypeError('data is required!');
        }
        console.log('updating the todo with id: ' + data.id + ' setting to: ' + data.checked);

        let text = `update ${TodoQuery.table} set checked = $1 where id = $2;`;
        let values = [data.checked, data.id];
        await this._pool.query({text, values});

        return data;
    }

    /**
     * Update the name of an existing todo
     * @param {Object} data - id/name pair to be updated in the database
     * @returns {Promise} a promise resolving with the result from the database
     */
    async updateTodoText(data) {
        if (typeof data !== 'object') {
            throw new TypeError('data is required');
        }

        console.log('updating the todo with id: ' + data.id + ' setting to: ' + data.name);

        let text = `update ${TodoQuery.table} set name = $1 where id = $2;`;
        let values = [data.name, data.id];
        await this._pool.query({text, values});

        return data;
    }

    /**
     * Delete an existing todo
     * @param {integer} idToDelete the id of the todo to delete
     * @returns {string} the id that was deleted
     **/
    async deleteTodo(idToDelete) {
        if (typeof idToDelete === 'undefined') {
            throw new TypeError('an id to delete is required');
        }

        console.log('deleting the todo with id: ' + idToDelete);

        let text = `delete from ${TodoQuery.table} where id = $1;`;
        let values = [idToDelete];

        await this._pool.query({text, values});

        return '' + idToDelete;
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
