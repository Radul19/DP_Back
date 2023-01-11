// import { Router } from "express"
// import userFunc from "../controllers/user"
const { Router } = require("express")
const userFunc = require("../controllers/user")

const router = Router()

const { test, register, login } = userFunc

router.get('/', test)
router.post('/register', register)
router.post('/login', login)


// export default router
module.exports = router
