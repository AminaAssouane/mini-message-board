const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY added DESC",
  );
  return rows;
}

async function insertMessage(name, text) {
  await pool.query("INSERT INTO messages (user_name, text) VALUES ($1, $2)", [
    name,
    text,
  ]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};
