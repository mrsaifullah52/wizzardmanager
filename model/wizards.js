import mongoose from 'mongoose';

const wizardSchema = mongoose.Schema({
  uid: {type:String, unique: true, sparse: true },
  title: String,
  pages:[
    {pagelink: String}
  ],
  link: String,
  status: String
});

const wizard = mongoose.model('wizard', wizardSchema);

export default wizard;