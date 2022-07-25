const { connection } = require("./app/models/postgres");
const { mongoose } = require("./app/models/mongo");

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

connection
    .sync({alter: true})
    .then(() => {
        console.log("Postgres Database synced");
    }).catch(err => {
        console.log("Error syncing database");
        console.log(err);
        process.exit(1);
    }).finally(() => {
        connection.close();
        process.exit(0);
    });