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

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0]; // single message
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageById,
};
