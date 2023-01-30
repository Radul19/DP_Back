const { Schema, model, SchemaTypes } = require('mongoose')

const objId = SchemaTypes.ObjectId

const ChatSchema = new Schema(
    {
        participants: { type: [{ type: objId, ref: 'User' }], required: true },
        messages: [{
            text: String,
            owner: String,
            timestamp: { type: Date, default: Date.now() },
        }],
    },
    {
        timestamps: true,
    }
);


module.exports = model('Chat', ChatSchema)