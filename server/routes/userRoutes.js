const router = require('express').Router()
const {getUsers,register,loginUser} =  require('../controllers/userController')

router.get('/',getUsers)
router.post('/register',register)
router.post('/login',loginUser)

module.exports = router