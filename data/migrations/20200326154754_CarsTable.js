exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();

    tbl
      .string("vin", 17)
      .notNullable()
      .unique();
    tbl.string("make", 255).notNullable();
    tbl.string("model", 255).notNullable();

    tbl.integer("mileage").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
