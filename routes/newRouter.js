const { Router } = require("express");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form", {
    title: "New Message",
    errors: [],
  });
});

module.exports = newRouter;
