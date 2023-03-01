const { Schema, model, SchemaTypes } = require('mongoose')

const objId = SchemaTypes.ObjectId

const ChatSchema = new Schema(
    {
        participants: { type: [{ type: objId, ref: 'User' }], required: true },
        messages: [{
            text: String,
            owner: String,
            timestamp: { type: Date, default: Date.now() },
            map: { type: Boolean, default: false },
            origin: {
                latitude: Number,
                longitude: Number
            },
            destination: {
                latitude: Number,
                longitude: Number
            }
        }],
        delivery_id: String,
        live_sharing: { type: Boolean, default: false },
        views: [String]

    },
    {
        timestamps: true,
    }
);


module.exports = model('Chat', ChatSchema)