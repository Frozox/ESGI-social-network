const Sequelize = require("sequelize");
const Logger = require('../../services/Logger');

const connection = new Sequelize(process.env.POSTGRES_CON_STRING, {
  useNewUrlParser: true,
  protocol: "postgres",
  dialect: "postgres",
  /*dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: {
          require: false,
          rejectUnauthorized: false
      }
  }*/
});

connection
  .authenticate()
  .then(() => {
    Logger.info("Connected to Postgres");
  })
  .catch((err) => {
    Logger.err(err);
    process.exit(1);
  });

module.exports = connection;
