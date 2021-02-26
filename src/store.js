// Use Container instead of DataStore on the server
const Container = require('js-data').Container;
const adapter = require('./adapter');

// Create a store to hold your Mappers
const store = new Container();

// Mappers in "store" will use the RethinkDB adapter by default
store.registerAdapter('rethinkdb', adapter, { default: true });

store.defineMapper('product', {
  schema: {
    properties: {
      title: {
        type: 'string'
      },
      type: {
        type: 'string', 
        enum: ['print']
      },
      images: {
        type: 'array',
        uniqueItems: true,
        items: {
          type: 'string'
        }
      },
      options: {
        type: 'array'
      },
      enabled: {
        type: 'boolean',
        default: true
      }
    }
  }
});

store.defineMapper('product-types', {
  schema: {
    properties: {
      name: {
        type: 'string'
      },
      options: {
        type: 'array'
      }
    }
  }
});


store.defineMapper('user', {
  schema: {
    name : {
      type: "string"
    } 
  }
});

module.exports = store;