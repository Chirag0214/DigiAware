const { Schema,model } = require('../connection');

const userSchema = new Schema({

    email: {type: String, unique: true},
    password: {type: String, required: true},
    
});
module.exports = model('User', userSchema);