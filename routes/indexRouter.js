const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

// To display the messages
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// To open a new page with message details :
indexRouter.get("/messages/:id", (req, res) => {
  const messageId = parseInt(req.params.id);
  const message = messages.find((m) => m.id === messageId);

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("messageDetail", { title: "Message Details", message });
});

// To add a new message
indexRouter.post("/new", (req, res) => {
  const newId = messages.length ? messages[messages.length - 1].id + 1 : 1;

  messages.push({
    id: newId,
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  });
  res.redirect("/");
});

module.exports = indexRouter;
