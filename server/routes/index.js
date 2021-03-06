var express = require('express');
var router = express.Router();
 
var auth = require('./auth.js');
var products = require('./products.js');
var lists = require('./lists.js');
var user = require('./users.js');

/*
 * Real routes 
 */
router.post('/api/v1/list/', lists.create);
router.post('/api/v1/list/:id', lists.update);
router.get('/api/v1/list/:id', lists.getOne);



/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/signup', auth.signup); 


/*
 * Fake routes
 */

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
 
module.exports = router;
