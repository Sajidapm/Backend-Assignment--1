const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    filterProducts,
    getproductsID
} = require('../controllers/inventoryController');
const validation = require('../middleware/validation');
router.get('/', getProducts);
router.post('/', validation, createProduct);
router.get('/search', searchProducts);
router.get('/filter', filterProducts);
router.get('/:id', getproductsID);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
module.exports = router;