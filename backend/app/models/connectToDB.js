const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const faker = require("faker");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.inventories = require("./inventory.model.js")(sequelize, Sequelize);

const places = ['Main Office', 'Cavea Galleria', 'Cavea Tbilisi Mall','Cavea East Point','Cavea City Mall'];

function getRandomPlace() {
  const randomIndex = Math.floor(Math.random() * places.length);
  return places[randomIndex];
}


//inserting 300,000 data
async function* generateFakeData() {
  for (let i = 0; i < 300000; i++) {
    yield {
      title: faker.commerce.productName(),
      place: getRandomPlace(),
      price: faker.commerce.price(),
    };
  }
}

async function insertFakeData() {
  const dataGenerator = generateFakeData();
  const batchSize = 1000;
  let batch = [];
  for await (const record of dataGenerator) {
    batch.push(record);
    if (batch.length === batchSize) {
      await db.inventories.bulkCreate(batch);
      batch = [];
    }
  }
  if (batch.length > 0) {
    await db.inventories.bulkCreate(batch);
  }
  console.log("Inserted fake data");
}

insertFakeData();

module.exports = db;
