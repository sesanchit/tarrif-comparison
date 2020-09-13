const supertest = require('supertest');
const app = require('../../server');

const apiResponse = [
    {
      "Tarrif Name": "Packaged Tarrif",
      "Annual costs (€/year)": 800
    },
    {
      "Tarrif Name": "Basic Electricity Tarrif",
      "Annual costs (€/year)": 830
    }
  ];

describe("Testing the Produts API", () => {

    it("should return the bad request when no parameter is supplied", async () => {
        const response = await supertest(app).get('/products');
        expect(response.status).toBe(400);
    });

    it("should return the bad request when consumption parameter is 0", async () => {
        const response = await supertest(app).get('/products?consumption=0');
        expect(response.status).toBe(400);
    });

    it("should return the product list", async () => {
        const response = await supertest(app).get('/products?consumption=3500');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(apiResponse);
    });

});