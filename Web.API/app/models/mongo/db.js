const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CON_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB: ", err.message);
  });

module.exports = mongoose;
