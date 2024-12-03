const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mimetype: { type: String, required: true },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now },
  extension:{type: String,required:true},
});


const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  achievements: { type: [String], default: [] },
  files: { type: [fileSchema], default: [] }, 
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', userSchema);
