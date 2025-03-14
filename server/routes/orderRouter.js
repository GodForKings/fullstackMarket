const Router = require('express')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')
const orderController = require('../controllers/orderController')

router.post('/', orderController.sendEmail)

module.exports = router
