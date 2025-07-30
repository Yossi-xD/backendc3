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

// GET ALL REQUESTS
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests", error: err });
  }
};


exports.deleteRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Request.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting request", error: err });
  }
};



