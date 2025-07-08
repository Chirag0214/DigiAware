const { Schema, model } = require('../connection');

const articalSchema = new Schema({
    expertId: { type: Schema.Types.ObjectId, ref: "experts", required: true, },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }
});
module.exports = model('articals', articalSchema);