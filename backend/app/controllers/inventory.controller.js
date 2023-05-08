const db = require("../models/connectToDB");
const Inventory = db.inventories;
const Op = db.Sequelize.Op;

// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Inventory
  const inventory = {
    title: req.body.title,
    price: req.body.price, 
    place: req.body.place,
    published: req.body.published ? req.body.published : false,

  };

  // Save Inventory in the database
  Inventory.create(inventory)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inventory."
      });
    });
};

// Retrieve all Inventories from the database.
exports.findAll = (req, res) => {
  const place = req.query.place;
  var condition = place ? { place: { [Op.eq]: place } } : null;

  const sortBy = req.query.sortBy;
  var order = [['title', 'ASC']]; // Default sort order

  if (sortBy === 'titleAsc') {
    order = [['title', 'ASC']];
  } else if (sortBy === 'titleDesc') {
    order = [['title', 'DESC']];
  } else if (sortBy === 'priceAsc') {
    order = [['price', 'ASC']];
  } else if (sortBy === 'priceDesc') {
    order = [['price', 'DESC']];
  }


  Inventory.findAll({ where: condition, order: order })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inventories."
      });
    });
};


// Delete a Inventory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Inventory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Inventory was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Inventory with id=${id}. Maybe Inventory was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Inventory with id=" + id
      });
    });
};
