const { Schema, model } = require('mongoose')
// import { Schema, model } from "mongoose"

/** USER_TYPE = 0,1,2,3,4 */
/** -1 = Baneado */
/** 0 = desabilitado */
/** 1 = onRegister */
/** 2 = Normal user */
/** 3 = Delivery */
/** 4 = Admin */

/** DELIVERY_STATUS = 1,2,3,4
/** 0 = Disponible */
/** 1 = Ocupado */
/** 2 = Ausente */
/** 3 = Deshabilitado */

const defaultProfile = 'https://res.cloudinary.com/deliveryplanet/image/upload/v1674949797/user_twylfd.png'

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        card_id: { type: String, required: true },
        card_pic: { type: String, required: true },
        card_pic_id: { type: String, required: true },
        password: { type: String, required: true },
        user_type: { type: Number, required: true },
        second_name: { type: String, required: true },
        profile_pic: { type: String, required: true, default: defaultProfile },
        profile_pic_id: { type: String, required: true, default: '_' },
        description: { type: String, required: false },
        default_place: { type: String, required: false },
        delivery_status: { type: Number, required: true, default: 3 },
    },
    {
        timestamps: true,
    }
);

UserSchema.methods.changeName = function () {
    // console.log(`Testing name here ${this.name}`)
    return this.name = 'Testing here'
}
UserSchema.methods.presignedProfile = async function () {
    return this
}


module.exports = model('User', UserSchema)
