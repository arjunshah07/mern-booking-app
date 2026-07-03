import mongoose from "mongoose";

mongoose.connect("MONGODB_CONNECTION_STRING")
  .then(() => console.log("Connected"))
  .catch(err => console.error(err));