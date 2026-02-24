const { Router } = require("express");
const indexRouter = Router();

const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

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
indexRouter.post(
  "/new",
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be under 50 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ max: 500 })
    .withMessage("Message must be under 500 characters"),

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("new", {
        title: "New Message",
        errors: errors.array(),
        oldData: req.body,
      });
    }

    await db.insertMessage(req.body.name, req.body.message);
    res.redirect("/");
  },
);

module.exports = indexRouter;
