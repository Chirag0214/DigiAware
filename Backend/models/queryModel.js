const {Schema, model}  = require('mongoose');

const  querySchema = new Schema({
    subject: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    message: {
         type: String,
        required: true,
        trim: true,
        minlength: 20,
        maxlength: 100
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expertId: {
     type: Schema.Types.ObjectId,
        ref: 'Expert'   
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved', 'closed'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    soluation: {
        type: String,
        trim: true
    },
    responses: [{
        message: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    }]
},{
    timestamps: true
});
//Add basic indexes
querySchema.index({ subject: 'text',message: 'text'});
querySchema.index({ status: 1 });

module.exports = model('Query', querySchema);