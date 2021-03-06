const pgp = require('pg-promise')();
const url = require('url');
require('env2')('./config.env');

if (!process.env.DATABASE_URL) {
  throw new Error('environment variable DB_URL must be set.')
}

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const herokuDB = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost'
};

const db = pgp(herokuDB);
module.exports = db;
