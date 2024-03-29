module.exports = (mongoose) => {
  const LogSchema = new mongoose.Schema({
    facility: Number,
    severity: Number,
    version: Number,
    createdAt: Date,
    hostName: String,
    appName: String,
    content: String,
    sourceIsServer: Boolean
  });

  return mongoose.model("Log", LogSchema);
};
