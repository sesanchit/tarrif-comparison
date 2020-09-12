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
        const error = new Error('Bad request');
        error.status = 400;
        next(error);
    }
}

function populateProducts(consumption){
    let productList = [];
    Products.forEach(product => {
        let productObj = {
            "Tarrif Name": product.name,
            "Annual costs (€/year)": 0
        };
        if (product.unitCap > 0) {
            productObj["Annual costs (€/year)"] = product.baseAnnualCost;
            if (consumption > product.unitCap) {
                productObj["Annual costs (€/year)"] += (consumption - product.unitCap) * product.additionalCost;
            }
        }
        else {
            productObj["Annual costs (€/year)"] = product.baseAnnualCost + product.additionalCost * consumption;
        }
        productList.push(productObj);
    });
    return productList;
}

