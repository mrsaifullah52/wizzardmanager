import mongoose from 'mongoose';

const uploadWizardSchema = mongoose.Schema({
  wid: {type: String, required: true},
  uid: {type: String, required: true},
  data: {type: Array, required: true}
});

const wdata = mongoose.model("wdata", uploadWizardSchema);

export default wdata;