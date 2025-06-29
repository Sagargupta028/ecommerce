const app = require(".");
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5454;

const mondbUrl = process.env.MONGODB_URL;

app.listen(PORT, async () => {
  console.log("Connecting to server...");

  try {
    await mongoose.connect(mondbUrl);
    console.log(`Connected to MongoDB and listening on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});
