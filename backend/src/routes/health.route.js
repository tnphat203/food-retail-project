const router = require("express").Router();

router.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
