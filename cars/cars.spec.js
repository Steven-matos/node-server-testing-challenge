const request = require("supertest");

const server = require("../api/server");

describe("CarsRouter.js", function() {
  describe("POST /", function() {
    it("Should return 201 created", function() {
      return request(server)
        .post("/api/car")
        .send({
          vin: "SFD1896978",
          make: "Nissan",
          model: "Z32",
          mileage: 142544
        })
        .expect(201);
    });
    it("Should return 400 Bad request", function() {
      return request(server)
        .post("/api/car")
        .send({})
        .expect(400);
    });
    it("Should return JSON", function() {
      return request(server)
        .post("/api/car")
        .send({
          vin: "JSH1784555",
          make: "Nissan",
          model: "Z32",
          mileage: 142544
        })
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
  });
  describe("DEL /:id", function() {
    it("Should return 200 OK", function() {
      return request(server)
        .delete("/api/car/14")
        .expect(200);
    });
    it("Should return JSON", function() {
      return request(server)
        .delete("/api/car/15")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("Should return 404 not found", function() {
      return request(server)
        .delete("/api/car/")
        .expect(404);
    });
  });
});
