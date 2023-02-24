// import { Router } from "express"
// import userFunc from "../controllers/user"
const { Router } = require("express")
const authFunc = require("../controllers/authorization")

const router = Router()

const { getUserRequests, userRequestAction,complaintAction,getComplaints,getUsers,updateUserInfo } = authFunc

router.get('/getUserRequests', getUserRequests)
router.post('/userRequestAction', userRequestAction)
router.post('/complaintAction', complaintAction)
router.get('/getComplaints', getComplaints)
router.post('/getUsers', getUsers)
router.post('/updateUserInfo', updateUserInfo)


// export default router
module.exports = router
