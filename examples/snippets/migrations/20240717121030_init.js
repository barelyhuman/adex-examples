/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable("snippets", (table) => {
    table.increments("id").primary();
    table.boolean("is_active").defaultTo("true").notNullable();
    table.timestamps(true, true);
    table.string("title").notNullable();
    table.text("snippet").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema.dropTableIfExists("snippets")
};
