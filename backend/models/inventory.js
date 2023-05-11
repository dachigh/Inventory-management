module.exports = (sequelize, Sequelize) => {
  const Inventory = sequelize.define("inventory", {
    title: {
      type: Sequelize.STRING
    },
    place: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.DECIMAL(10,2)
    },
  });

  return Inventory;
};
