const bb = require('bluebird');
bb.config({ longStackTraces: true });

const pgp = require('pg-promise')({ promiseLib: bb });
const connection = process.env.pgConnection;
const db = pgp(connection);
 
export = db;