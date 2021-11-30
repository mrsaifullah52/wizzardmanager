import mongoose from 'mongoose';

// creating schema
const wFormSchema = mongoose.Schema({
  uid: { type: String, required: true },
  wid: { type: String, required: true },
  pid: { type: String, required: true },
  form: {type: Array}
});

// creating model
const wForm = mongoose.model("wForms", wFormSchema);
export default wForm;