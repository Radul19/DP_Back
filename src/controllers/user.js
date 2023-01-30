// import bcrypt from 'bcrypt'
// import { User } from "../models/userSchema";
const bcrypt = require('bcrypt')
const User = require("../models/userSchema")
const Chat = require("../models/chatSchema")
const { UserRequests } = require("../models/requestSchema")
const saltRounds = 10;
const userFunc = {}

const admin_pass = '1234-5678'

const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'deliveryplanet',
    api_key: '317699299852547',
    api_secret: '8MwOkn2RLuQxxJ7gOzDKuif2ofs'
});

const blackbox = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABEgAAACjCAYAAACZtyuEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARDSURBVHgB7dgBDcAwDMCw/Tqi8ufWj0dsKSTyzMweAAAAgK59DwAAAECcQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQJ5BAgAAAOQZJAAAAECeQQIAAADkGSQAAABAnkECAAAA5BkkAAAAQN532wMAAADQtT/zaAXag6h60wAAAABJRU5ErkJggg=="


//// cloudinary

// cloudinary.v2.uploader.upload("url or file",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

userFunc.test = (req, res) => {
    console.log('hey')
    res.send('hey')
}
userFunc.deleteAll = async (req, res) => {
    await User.collection.drop()
    await UserRequests.collection.drop()
    res.send('All deleted')
}

userFunc.register = async (req, res) => {
    console.log('#user-register')
    try {
        const { admin_bool, admin_code, password: passOld, selfie, card_pic, ...userdata } = req.body

        /// verify email
        const finduser = await User.findOne({ email: userdata.email })
        if (finduser) {
            return res.status(409).json({
                msg: 'El correo ya está en uso'
            })
        }
        /// verify card_id
        const finduser2 = await User.findOne({ card_id: userdata.card_id })
        if (finduser2) {
            return res.status(409).json({
                msg: 'El documento de identidad ya está registrado, contacte a un administrador'
            })
        }

        /// START REGISTER

        /// CARD IMAGES
        const { secure_url: card_url, public_id: card_pic_id } = await cloudinary.uploader.upload(card_pic, {})

        const password = await bcrypt.hash(passOld, saltRounds)
        if (!admin_bool) {
            /// register user

            /// SELFIE IMAGES
            const { secure_url: selfie_url, public_id: selfie_pic_url } = await cloudinary.uploader.upload(selfie, {})

            const newuser = new User({
                ...userdata, password, user_type: 1,
                card_pic: card_url,
                card_pic_id: card_pic_id
            })
            const newRequest = new UserRequests({
                user_data: newuser._id,
                selfie: selfie_url,
                selfie_id: selfie_pic_url,
                card_pic: card_url,
            })
            await newuser.save()
            await newRequest.save()
            return res.json({ ok: true })

        } else {
            /// register admin
            if (admin_code === admin_pass) {
                const newuser = new User({
                    ...userdata, password,
                    user_type: 4,
                    card_pic: card_url,
                    card_pic_id: card_pic_id
                })
                await newuser.save()
                return res.json({ ok: true })
            } else {
                res.status(401).json({
                    msg: 'Codigo de administrador incorrecto'
                })
            }

        }
    } catch (error) {
        console.log(error)
        // console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}


userFunc.login = async (req, res) => {
    console.log('#user-login')

    const { email, password } = req.body
    const finduser = await User.findOne({ email })
    if (finduser) {
        bcrypt.compare(password, finduser.password, async (err, result) => {
            if (result) {
                if (finduser.user_type === 0) {
                    console.log('userDeleted')
                    // await User.findOneAndDelete({ _id: finduser._id })
                    res.status(401).json({
                        msg: 'Su petición de registro ha sido rechazada'
                    })
                } else if (finduser.user_type === 1) {
                    console.log('userOnReview')
                    res.status(203).json({
                        msg: 'Su petición de registro esta en revisión'
                    })
                } else {
                    res.send(finduser)
                }
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

userFunc.getDeliverys = async (req,res)=>{
    console.log('#user-getDeliverys')
    const retrieve ={
        name:1,
        second_name:1,
        email:1,
        profile_pic:1,
        delivery_status:1,
    }
    try {
        // const {filters} = req.body
        const result = await User.find({delivery_status:{$lt:3} },retrieve)
        // console.log(result)
        if(result){
            if(result.length < 1){
                res.status(204)
            }else{
                res.send(result)
            }
        }else{
            res.status(409).json({msg:'No se ha podido obtener la informacion'})
        }
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}
userFunc.changeDeliStatus = async (req,res)=>{
    console.log('#user-changeDeliStatus')
    try {
        const {_id,num} = req.body
        const result = await User.findOneAndUpdate({_id},{delivery_status:num})
        // console.log(result)
        if(result){
            res.send({ok:true})
        }else{
            res.status(409).json({msg:'No se ha podido actualizar la informacion'})
        }
        
    } catch (error) {
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}
userFunc.getMessages = async (req,res)=>{
    console.log('#user-getMessages')
    try {
        const {_id} = req.body
        const result = await Chat.findOne({_id})
        if(result){
            res.send(result)
        }else{
            res.status(409).json({msg:'No se ha podido actualizar la informacion'})
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}
userFunc.getMyChat = async (req,res)=>{
    console.log('#user-getMyChat')
    try {
        const {user_id} = req.body
        const result = await Chat.find({participants:{$in:[user_id]}},{participants:1}).populate('participants')
        if(result){
            res.send(result)
        }else{
            res.status(404).json({msg:'No se ha podido obtener la informacion'})
        }
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}

module.exports = userFunc


// userFunc.test = async (req,res)=>{
//     console.log('#user-getAllDeliverys')

//     try {
        
//     } catch (error) {
//         res.status(404).json({
//             msg: 'Correo incorrecto'
//         })
//     }

// }