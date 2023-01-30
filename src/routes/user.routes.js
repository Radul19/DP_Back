// import { Router } from "express"
// import userFunc from "../controllers/user"
const { Router } = require("express")
const userFunc = require("../controllers/user")

const router = Router()

const { test, register, login, deleteAll, getDeliverys, changeDeliStatus, getMessages, getMyChat } = userFunc

router.get('/', test)
router.get('/deleteAll', deleteAll)
router.post('/register', register)
router.post('/login', login)
router.post('/getDeliverys', getDeliverys)
router.post('/changeDeliStatus', changeDeliStatus)
router.post('/getMessages', getMessages)
router.post('/getMyChat', getMyChat)


// export default router
module.exports = router
