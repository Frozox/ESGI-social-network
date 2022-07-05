const Sequelize = require("sequelize");

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
    console.log("Connected to Postgres");
  })
  .catch((err) => {
    console.error("Error connecting to Postgres: ", err.message);
    process.exit(1);
  });

module.exports = connection;
