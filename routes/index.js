const { Router } = require('express');
const controllers = require('../controllers');
const router = Router();

router.get('/', (req, res) => res.send('This is the root!'))

//Connect CRUD actions...bring in const controllers
router.post('/items', controllers.createItem) //specify .createItem function
router.get('/items', controllers.getAllItems)
router.get('/items/:id', controllers.getItemById)
router.put('/items/:id', controllers.updateItem)
router.delete('/items/:id', controllers.deleteItem) //don't forget to check for all CRUD actions

module.exports = router;