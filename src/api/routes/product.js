const express = require('express');
const router = express.Router();

const ProductsController = require('../controllers/product');

/**
 * @swagger
 * path:
 *  /products:
 *    get:
 *      summary: Get Products
 *      description: Get the tarrif products based on the unit consumption to compare the products based on their annual costs.
 *      parameters:
 *       - name: consumption
 *         in: query
 *         schema:
 *           type: number
 *           default: 3500
 *         description: Enter the Consumption (kWh/year)
 *      schema: Product
 *      responses:
 *        "200":
 *          description: Returns the list of tarrif products sorted on the annual costs
 *        "400":
 *          description: Bad request. Consumption value must be greater than 0.
 */
router.get('/', ProductsController.products_get_all);

module.exports = router;