const mongoose = require("mongoose");

async function deleteDocuments() {
  await mongoose.connect("mongodb+srv://sagargupta028:Sagar@9097@cluster0.tpyfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  });

  const User = require("../src/models/address.model"); // Replace with your model
  await User.deleteMany({ firstName: "Sagar" });
  console.log("All documents with firstName 'Sagar' deleted");

  await mongoose.disconnect();
}

deleteDocuments();
