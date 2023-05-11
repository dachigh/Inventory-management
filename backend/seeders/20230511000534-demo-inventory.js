"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "inventories",
      [
        {
          id: 1,
          title: "title-1",
          place: "მთავარი ოფისი",
          price: 100,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: "title-2",
          place: "კავეა გალერია",
          price: 200,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: "title-3",
          place: "კავეა თბილისი მოლი",
          price: 300,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: "title-4",
          place: "კავეა ისთ ფოინთი",
          price: 400,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          title: "title-5",
          place: "კავეა სითი მოლი",
          price: 500,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("inventories", null);
},
};
