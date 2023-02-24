
const User = require("../models/userSchema")
const cloudinary = require('cloudinary')
const { UserRequests, Complaints } = require("../models/requestSchema")
cloudinary.config({
    cloud_name: 'deliveryplanet',
    api_key: '317699299852547',
    api_secret: '8MwOkn2RLuQxxJ7gOzDKuif2ofs'
});

const autho = {}

autho.test = (req, res) => {
    try {

        console.log('hey')
        res.send('hey')
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}


autho.changeStatus = async (req, res) => {
    try {
        const { user_id, num, deleteUser } = req.body

        if (deleteUser) {
            const result = await User.findOneAndDelete({ _id: user_id })
            if (result) {
                res.json({ ok: true })
            } else {
                res.status(101).json({
                    ok: false
                })
            }
        } else {
            const result = await User.findOneAndUpdate({ _id: user_id }, { user_type: num })

            if (result) {
                res.json({ ok: true })
            } else {
                res.status(101).json({
                    ok: false
                })
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}

autho.getUserRequests = async (req, res) => {
    console.log('#auth-getUserRequests')

    try {
        const results = await UserRequests.find().populate('user_data')

        if (results) {
            res.send(results)
        } else {
            res.status(404).json({
                msg: 'No se encontraron resultados'
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }

}

autho.getComplaints = async (req, res) => {
    console.log('#auth-getComplaints')
    try {
        const result = await Complaints.find().populate('creator target')
        res.send(result)
    } catch (error) {
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

autho.complaintAction = async (req, res) => {
    console.log('#auth-complaintAction')
    try {
        const { complaint_id, action, target_id } = req.body

        if (action) {
            await User.findOneAndUpdate({ _id: target_id }, { user_type: -1 })
            await Complaints.findOneAndDelete({ _id: complaint_id })
        } else {
            await Complaints.deleteMany({ target: target_id })
        }
        res.send({ ok: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}
autho.userRequestAction = async (req, res) => {
    console.log('#auth-userRequestAction')
    try {
        const { user_id, num } = req.body

        const result = await User.findOneAndUpdate({ _id: user_id }, { user_type: num })
        // await UserRequests.findOneAndDelete({ user_data: user_id })

        if (result) {
            res.json({ ok: true })
        } else {
            res.status(101).json({
                ok: false
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

autho.getUsers = async (req, res) => {
    console.log('#auth-getUsers')
    try {
        const retrieve = {
            password: 0,
            card_pic_id: 0,
            profile_pic_id: 0,
            createdAt: 0,
            updatedAt: 0,
        }
        const { text } = req.body
        const newText = text.replaceAll(' ', '|')
        const query = {
            $or: [{ name: text.length > 0 ? new RegExp(newText, "i") : { $exists: true } }, { second_name: text.length > 0 ? new RegExp(newText, "i") : { $exists: true }, }],
        }

        const result = await User.find(query, retrieve)
        if (result) {
            if (result.length < 1) {
                res.status(204)
            } else {
                res.send(result)
            }
        } else {
            res.status(409).json({ msg: 'No se ha podido obtener la informacion' })
        }

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}

autho.updateUserInfo = async (req, res) => {
    console.log('#auth-updateUserInfo')
    try {
        console.log(req.body)
        const { _id, place, card_pic, profile_pic, ...newValues } = req.body
        await User.findOneAndUpdate({ _id }, { ...newValues })
        res.send({ ok: true })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            msg: 'Error inesperado'
        })
    }
}
// autho.approveUser = (req, res) => {
//     const { user_id } = req.body

//     const result = User.findOneAndUpdate({ _id: user_id }, { user_type: 2 })

//     if (result) {
//         res.json({ ok: true })
//     } else {
//         res.status(101).json({
//             ok: false
//         })
//     }

// }
// autho.denyUser = (req, res) => {
//     const { user_id } = req.body

//     const result = User.findOneAndUpdate({ _id: user_id }, { user_type: 0 })

//     if (result) {
//         res.json({ ok: true })
//     } else {
//         res.status(101).json({
//             ok: false
//         })
//     }

// }
// autho.approveDelivery = (req, res) => {
//     const { user_id } = req.body

//     const result = User.findOneAndUpdate({ _id: user_id }, { user_type: 0 })

//     if (result) {
//         res.json({ ok: true })
//     } else {
//         res.status(101).json({
//             ok: false
//         })
//     }
// }
// autho.denyDelivery = (req, res) => {
//     const { user_id } = req.body

//     const result = User.findOneAndUpdate({ _id: user_id }, { user_type: 3 })

//     if (result) {
//         res.json({ ok: true })
//     } else {
//         res.status(101).json({
//             ok: false
//         })
//     }

// }
// autho.disableUser = (req, res) => {
//     const { user_id } = req.body

//     const result = User.findOneAndUpdate({ _id: user_id }, { user_type: 0 })

//     if (result) {
//         res.json({ ok: true })
//     } else {
//         res.status(101).json({
//             ok: false
//         })
//     }
// }

// autho.deleteUser = (req, res) => {
//     const { user_id } = req.body

//     const result = User.findOneAndDelete({ _id: user_id })

//     if (result) {
//         res.json({ ok: true })
//     } else {
//         res.status(101).json({
//             ok: false
//         })
//     }
// }


module.exports = autho