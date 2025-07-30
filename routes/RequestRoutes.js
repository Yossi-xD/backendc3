const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createRequest,
  getAllRequests,
  deleteRequest, // ✅ add this
} = require("../controllers/requestController");

router.post("/", protect, createRequest);
router.get("/", getAllRequests);
router.delete("/:id", deleteRequest); // ✅ this is new

module.exports = router;
