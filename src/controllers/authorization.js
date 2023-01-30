
const User = require("../models/userSchema")
const cloudinary = require('cloudinary')
const { UserRequests } = require("../models/requestSchema")
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
        console.log(results)

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

autho.userRequestAction = async (req, res) => {
    console.log('#auth-userRequestAction')
    try {
        const { user_id, num } = req.body

        const result = await User.findOneAndUpdate({ _id: user_id }, { user_type: num })
        await UserRequests.findOneAndDelete({ user_data: user_id })

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