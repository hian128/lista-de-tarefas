const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "hianeloa128",
  host: "localhost",
  port: 5432,
  database: "tarefasdb"
});

module.exports = pool;