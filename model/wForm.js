import mongoose from 'mongoose';

const wFormSchema = mongoose.Schema({
  uid: { type: String, required: true },
  wid: { type: String, required: true },
  pid: { type: String, required: true },
  form: [
    {

    }
  ]
});

const wForm = mongoose.model("wForms", wFormSchema);
export default wForm;