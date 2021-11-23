import mongoose from 'mongoose';

const wizardSchema = mongoose.Schema({
  title: String,
  pages:[
    {pagelink: String}
  ],
  link: String,
  status: String
});

const wizard = mongoose.model('wizard', wizardSchema);

export default wizard;