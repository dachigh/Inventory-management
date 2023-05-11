module.exports = (app) => {
    const inventories = require("../controllers/inventory.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Inventories list
    router.get("/", inventories.findAll);
  
    // Create a new Inventory json: title,place,place
    router.post("/", inventories.create);
  
    // Delete a Inventory with id
    router.delete("/:id", inventories.delete);
  
    app.use("/inventories", router);
  };
  