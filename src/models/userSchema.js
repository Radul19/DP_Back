
import { Schema, model } from "mongoose"

const UserSchema = new Schema(
    {
        name: { type: String, required: false },
        email: { type: String, required: false },
        card_ID: { type: String, required: false },
        password: { type: String, required: false },
        user_type: { type: Number, required: false },
        second_name: { type: String, required: false },
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

export const User = model("User", UserSchema);

// module.exports = model('User', UserSchema)
