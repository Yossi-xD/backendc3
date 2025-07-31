const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createRequest,
  getAllRequests,
  deleteRequest, // ✅ add this
} = require("../controllers/requestController");

router.post("/", protect, createRequest);
router.get("/", protect, getAllRequests);  // ✅ protected route
router.delete("/:id", protect, deleteRequest);  // ✅ secured with protect

module.exports = router;
