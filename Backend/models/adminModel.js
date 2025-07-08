const { Schema,model } = require('../connection');

const adminSchema = new Schema({
    
    email: {type: String, unique: true},
    password: {type: String, required: true}
    
});
module.exports = model('admins', adminSchema);