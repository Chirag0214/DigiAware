const { Schema, model } = require('../connection');

const newsSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = model('news', newsSchema);