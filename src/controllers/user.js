// import bcrypt from 'bcrypt'
// import { User } from "../models/userSchema";
const bcrypt = require('bcrypt')
const { User } = require("../models/userSchema")
const saltRounds = 10;
const userFunc = {}

const admin_pass = '1234-5678'

userFunc.test = (req, res) => {
    console.log('hey')
    res.send('hey')

}
userFunc.register = async (req, res) => {
    const { admin_bool, admin_code, password: passOld, ...userdata } = req.body

    /// verify email
    const finduser = await User.findOne({ email: userdata.email })
    if (finduser) {
        return res.status(401).json({
            msg: 'El correo ya esta en uso'
        })
    }

    const password = await bcrypt.hash(passOld, saltRounds)
    if (!admin_bool) {
        /// register user
        const newuser = new User({ ...userdata, password, user_type: 1 })
        // console.log(passOld)
        await newuser.save()
        return res.json({ ok: true })

    } else {
        /// register admin
        if (admin_code === admin_pass) {
            const newuser = new User({ ...userdata, password, user_type: 3 })
            await newuser.save()
            return res.json({ ok: true })
        } else {
            res.status(401).json({
                msg: 'Codigo de administrador incorrecto'
            })
        }

    }
}


userFunc.login = async (req, res) => {

    const { email, password } = req.body
    const finduser = await User.findOne({ email })
    console.log(finduser)
    if (finduser) {
        bcrypt.compare(password, finduser.password, function (err, result) {
            if (result) {
                console.log(finduser)
                res.send(finduser)
            } else {
                res.status(401).json({
                    msg: 'Contraseña incorrecta'
                })
            }
        });

    } else {
        res.status(404).json({
            msg: 'Correo incorrecto'
        })
    }

    // res.send('hey')

}
module.exports = userFunc
// export default userFunc