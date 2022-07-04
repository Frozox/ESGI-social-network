const Sequelize = require("sequelize");

const connection = new Sequelize(process.env.POSTGRES_CON_STRING, {
  useNewUrlParser: true,
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
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.error("Error connecting to Postgres: ", err.message);
  });

module.exports = connection;
