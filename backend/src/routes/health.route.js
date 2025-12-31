const router = require("express").Router();

/* Health check */
router.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = router;
