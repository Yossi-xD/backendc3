const Request = require("../models/Request");


// CREATE A NEW REQUEST
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new Request({
  ...req.body,
  user: req.user._id  // ✅ store the ID of the user making the request
});

    await newRequest.save();
    res.status(201).json({ message: "Request created!", request: newRequest });
  } catch (err) {
    res.status(500).json({ message: "Failed to post request", error: err });
  }
};

// GET REQUESTS BASED ON ROLE
exports.getAllRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const userRole = req.user.role;

    let requests;

    if (userRole === "requester") {
      // Show only this user's requests
    requests = await Request.find({ createdBy: userId }).sort({ createdAt: -1 });     } else {
      // Travelers or admins can see all
      requests = await Request.find();
    }

    res.json(requests);
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// SECURE DELETE
exports.deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Request.findById(id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Only requester who created it can delete
    if (
      req.user.role !== "requester" ||
      request.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to delete this request" });
    }

    await request.deleteOne();
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err });
  }
};



