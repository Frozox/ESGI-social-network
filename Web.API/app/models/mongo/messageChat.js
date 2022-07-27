module.exports = (mongoose) => {
    const messageChatSchema = new mongoose.Schema({
        idPostgres: {
            type: Number,
            index: true,
            unique: true,
            key: 'primary'
        },
        userSrc: {
            type: Number,
            index: true,
        },
        userDest: {
            type: Number,
            index: true,
        },
        content: {
            type: String,
            required: true,
        },
    });

    return mongoose.model("messageChat", messageChatSchema);
};
