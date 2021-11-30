import mongoose from 'mongoose';

// creating schema
const wizardSchema = mongoose.Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  pages: [
    // each page data
    {
      pagelink: {
        type: String,
        required: true
      }
    }
  ],
  position: { type: Number, required: true },
  link: { type: String, required: true },
  status: { type: String, required: true }
});

// creating model
const wizard = mongoose.model('wizard', wizardSchema);

export default wizard;