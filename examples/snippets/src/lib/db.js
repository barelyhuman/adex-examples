import knex from "knex";
import knexConfig from "../../knexfile.js";

function createConnectionCacher(config) {
  let connection;
  return () => {
    return connection || ((connection = knex(config)), connection);
  };
}

export const db = createConnectionCacher(
  knexConfig[process.env.NODE_ENV || "development"]
)();
