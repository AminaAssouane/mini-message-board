require("dotenv").config();
const { Client } = require("pg");

const createTable = `CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name VARCHAR(255) NOT NULL,
      text TEXT NOT NULL,
      added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

const createData = `INSERT INTO messages (user_name, text) VALUES 
('Lily', 'Hi Harry'), ('James', 'Sup son'), ('Sirius', 'Right here')`;

async function main() {
  const client = new Client({
    connectionString: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  try {
    await client.connect();
    console.log("Connected to database.");
    await client.query("DROP TABLE IF EXISTS messages");
    console.log("Table reset.");
    await client.query(createTable);
    console.log("Table created.");
    await client.query(createData);
    console.log("Table populated");
  } catch (error) {
    console.error("Error occured:", error);
  } finally {
    await client.end();
    console.log("Done.");
  }
}

main();
