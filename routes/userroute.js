const router = require('express').Router()
const {register,login,logout} = require('../controller/usercontroller')

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').post(login)

module.exports = router