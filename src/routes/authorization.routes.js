// import { Router } from "express"
// import userFunc from "../controllers/user"
const { Router } = require("express")
const authFunc = require("../controllers/authorization")

const router = Router()

const { getUserRequests,userRequestAction } = authFunc

router.get('/getUserRequests', getUserRequests)
router.post('/userRequestAction', userRequestAction)


// export default router
module.exports = router
