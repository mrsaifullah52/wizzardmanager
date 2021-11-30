import mongoose from 'mongoose';

const wizardSchema = mongoose.Schema({
  uid: { type: String, required: true },
  title: { type: String, required: true },
  pages: [
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

const wizard = mongoose.model('wizard', wizardSchema);

export default wizard;