import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id: String,
  title: String,
  course: String,
  description: String,
  points: Number,
  dueDate: String,
  availableStartDate: String,
  availableEndDate: String,
},
{ collection: "assignments" });

export default schema;