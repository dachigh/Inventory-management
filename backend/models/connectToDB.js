const config = require(__dirname + '/../config/config.json')['development'];
const Sequelize = require("sequelize");
const faker = require("faker");


const sequelize = new Sequelize(config.database, config.username , config.password , {
  host: config.host,
  dialect: config.dialect,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.inventories = require("./inventory.js")(sequelize, Sequelize);

const places = [
  "მთავარი ოფისი",
  "კავეა გალერია",
  "კავეა თბილისი მოლი",
  "კავეა ისთ ფოინთი",
  "კავეა სითი მოლი",
];

function getRandomPlace() {
  const randomIndex = Math.floor(Math.random() * places.length);
  return places[randomIndex];
}

//inserting 300,000 data
async function* generateFakeData() {
  for (let i = 0; i < 30; i++) {
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
