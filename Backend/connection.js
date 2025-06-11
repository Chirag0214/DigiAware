const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.DB_URL;

mongoose.connect(url)
.then((result) => {
    console.log('Connect to Mongo DB');
    
}).catch((err) => {
    console.log('Error Connect to Mongo DB', err);
    
});

module.exports = mongoose;