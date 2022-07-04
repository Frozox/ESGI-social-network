module.exports = (mongoose) => {
    const messageChatSchema = new mongoose.Schema({
        id_user: String,
        content: String,
        sendAt: Date
    });

    return mongoose.model("messageChat", messageChatSchema);
};
