const pool = require("./pool");

async function createTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ messages table created");
  pool.end();
}

createTable();
