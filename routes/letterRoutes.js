const { Router } = require('express');
const letterController = require('../controllers/letterController')

const router = Router()

router.post('/subscribe', letterController.subscribe);
router.post('/sendfeedback', letterController.feedback);
router.get('/getfeedback', letterController.feedback_get);

module.exports = router;