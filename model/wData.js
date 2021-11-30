import mongoose from 'mongoose';

// creating schema
const uploadWizardSchema = mongoose.Schema({
  wid: { type: String, required: true },
  uid: { type: String, required: true },
  data: { type: Array, required: true }
});

// creating model
const wdata = mongoose.model("wdata", uploadWizardSchema);

export default wdata;