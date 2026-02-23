const { Router } = require("express");
const indexRouter = Router();

const db = require("../db/queries");

// To display the messages
indexRouter.get("/", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// To open a new page with message details :
indexRouter.get("/messages/:id", async (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = await db.getMessageById(messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("messageDetail", { title: "Message Details", message });
});

// To add a new message
indexRouter.post("/new", async (req, res) => {
  const { name, message } = req.body;

  // ✅ server-side validation
  if (!name || !message) {
    return res.status(400).send("All fields required");
  }

  await db.insertMessage(name.trim(), message.trim());
  res.redirect("/");
});

module.exports = indexRouter;
