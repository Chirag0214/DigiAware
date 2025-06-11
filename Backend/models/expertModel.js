const { Schema,model } = require('../connection');

const expertSchema = new Schema({
    email: {type: String, unique: true},
    password: {type: String, required: true},
    
});
module.exports = model('experts', expertSchema);