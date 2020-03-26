const db = require("../data/dbConfig");

module.exports = {
  get,
  getById,
  add,
  remove,
  update
};

function get() {
  return db("cars");
}

function getById(id) {
  return db("cars")
    .where({ id })
    .first();
}

async function add(car) {
  const [id] = await db("cars").insert(car, "id");

  return getById(id);
}

async function remove(id) {
  try {
    const car = await getById(id);
    if (id) {
      db("cars")
        .where("id", id)
        .del();
      return car;
    } else {
      return null;
    }
  } catch (err) {
    console.log("You are getting an error of:", err);
  }
}

function update(change, id) {
  return db("cars")
    .where({ id })
    .update(change)
    .then(() => {
      return getById(id);
    });
}
