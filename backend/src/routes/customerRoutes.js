const express = require("express");

const {
  getAllCustomers,
  getCustomerHistory,
  getStats,
} = require("../controllers/customerController");

const router = express.Router();

router.get("/", getAllCustomers);
router.get("/stats", getStats);
router.get("/:userId", getCustomerHistory);

module.exports = router;