const { join, dirname } = require('path');
const { readFileSync } = require('fs');
const Database = require('better-sqlite3');
const { drizzle } = require('drizzle-orm/better-sqlite3');

const DB_PATH = join(__dirname, '..', '..', 'library.db');
const SCHEMA_PATH = join(__dirname, 'schema.sql');

const sqlite = new Database(DB_PATH);
sqlite.pragma('journal_mode = WAL');
sqlite.pragma('foreign_keys = ON');

// Migrations can be used, but this works.
const schema = readFileSync(SCHEMA_PATH, 'utf8');
sqlite.exec(schema);

const db = drizzle(sqlite);

module.exports = { db, sqlite };