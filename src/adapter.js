const config = require('config');
const RethinkDBAdapter = require('js-data-rethinkdb').RethinkDBAdapter;

// Create an instance of RethinkDBAdapter
const adapter = new RethinkDBAdapter({
    rOpts: {
      host: config.db.host,
      port: config.db.port,
      db: config.db.db,
      authKey: process.env.DB_AUTH_KEY
    }
  });

module.exports = adapter;