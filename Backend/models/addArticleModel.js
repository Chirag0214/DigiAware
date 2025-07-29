const { Schema, model } = require('../connection');

const articleSchema = new Schema({
    expertId: { type: Schema.Types.ObjectId, ref: "experts", required: true, },
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    image: { type: String }
});
module.exports = model('articles', articleSchema);