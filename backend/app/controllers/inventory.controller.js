const db = require("../models/connectToDB.js");
const Inventory = db.inventories;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 20;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: inventories } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, inventories, totalPages, currentPage };
};

// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.price || !req.body.place) {
    res.status(400).send({
      message: "All fields are required!"
    });
    return;
  }
  if (req.body.price === null) {
    res.status(400).send({
      message: "Price can not be null!"
    });
    return;
  }

  // Create a Inventory
  const inventory = {
    title: req.body.title,
    price: req.body.price, 
    place: req.body.place,
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
  const { page, size, place, sortBy, sortOrder } = req.query;
  var condition = place ? { place: { [Op.eq]: `${place}` } } : null;

  const { limit, offset } = getPagination(page, size);

  let order;
  if (sortBy && sortOrder) {
    order = [[sortBy, sortOrder]];
  }

  Inventory.findAndCountAll({ where: condition, limit, offset,order })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
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
