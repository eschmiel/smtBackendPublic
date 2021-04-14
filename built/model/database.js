"use strict";
var bb = require('bluebird');
bb.config({ longStackTraces: true });
var pgp = require('pg-promise')({ promiseLib: bb });
var connection = process.env.pgConnection;
var db = pgp(connection);
module.exports = db;
