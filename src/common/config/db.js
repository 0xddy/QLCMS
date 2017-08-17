'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  connectionLimit: 10,
  adapter: {
    mysql: {
      host: '127.0.0.1',
      port: '3306',
      database: 'ql',
      user: 'root',
      password: 'dy19950826',
      prefix: 'ql_',
      encoding: 'utf8mb4'
    },
    mongo: {

    }
  }
};