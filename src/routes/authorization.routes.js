// import { Router } from "express"
// import userFunc from "../controllers/user"
const { Router } = require("express")
const authFunc = require("../controllers/authorization")

const router = Router()

const { getUserRequests, userRequestAction,complaintAction,getComplaints } = authFunc

router.get('/getUserRequests', getUserRequests)
router.post('/userRequestAction', userRequestAction)
router.post('/complaintAction', complaintAction)
router.get('/getComplaints', getComplaints)


// export default router
module.exports = router
