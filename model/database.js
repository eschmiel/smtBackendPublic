const pgp = require('pg-promise')();
const connection = 'postgres://postgres:Open4eric!@social-media-toggle.c2xdkxi85sar.us-east-1.rds.amazonaws.com:5432/smt';
const db = pgp(connection);

module.exports = db;