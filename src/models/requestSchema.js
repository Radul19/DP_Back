const { Schema, model, SchemaTypes } = require('mongoose')
// import { Schema, model } from "mongoose"
const objId = SchemaTypes.ObjectId

const UserReqSchema = new Schema(
    {
        user_data: { type: objId, required: true, ref: 'User' },
        selfie: { type: String, required: true },
        selfie_id: { type: String, required: true },
        card_pic: { type: String, required: true },

    },
    {
        timestamps: true,
    }
);

// export const User = model("User", UserSchema);

module.exports = {
    UserRequests: model('UserRequests', UserReqSchema)
}
