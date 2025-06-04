const Router = require('express');
const itemController = require('../controllers/itemController');
const { addItem, requireAuth } = require('../middleware/authMiddleware');

const router = Router();

router.get('/item/search', requireAuth, itemController.item_get);
router.get('/items', requireAuth, itemController.all_items);
router.get('/one-user/:id', itemController.one_user);
router.post('/create-order', itemController.create_order);
router.get('/user-orders/:id', itemController.user_orders);
router.get('/orders', itemController.orders_get);
router.delete('/cancel-order/:id', itemController.cancel_order);

module.exports = router