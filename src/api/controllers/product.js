const Products = require('../models/product');
const SortHelper = require('../helpers/sort');

exports.products_get_all = (req, res, next) => {
    const { consumption } = req.query;
    if (consumption && !isNaN(consumption) && consumption > 0) {
        let productList = populateProducts(consumption);
        productList.sort(SortHelper("Annual costs (€/year)"))
        res.status(200).json(productList);
    }
    else {
        const error = new Error('Bad request. Consumption value must be greater than 0');
        error.status = 400;
        next(error);
    }
}

function populateProducts(consumption){
    let productList = [];
    Products.forEach(product => {
        let productObj = {
            "tarrifName": product.name,
            "annualCosts": 0,
            "units": "(€/year)"
        };
        if (product.unitCap > 0) {
            productObj["annualCosts"] = product.baseAnnualCost;
            if (consumption > product.unitCap) {
                productObj["annualCosts"] += (consumption - product.unitCap) * product.additionalCost;
            }
        }
        else {
            productObj["annualCosts"] = product.baseAnnualCost + product.additionalCost * consumption;
        }
        productList.push(productObj);
    });
    return productList;
}

