const router = require('express').Router()
const {register} = require('../controller/usercontroller')

router.route('/register').post(register)

module.exports = router