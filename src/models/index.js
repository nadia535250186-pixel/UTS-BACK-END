const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// DEBUG (hapus nanti kalau sudah jalan)
console.log('DB USED:', config.database.connection);

// Connect ke MongoDB
mongoose.connect(config.database.connection, {
  dbName: config.database.name,
})
.then(() => {
  logger.info('✅ Successfully connected to MongoDB');
})
.catch((err) => {
  logger.fatal(err, '❌ MongoDB connection error');
  process.exit(1);
});

const db = mongoose.connection;

const dbExports = {};
dbExports.db = db;

const basename = path.basename(__filename);

// Auto load semua model
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;