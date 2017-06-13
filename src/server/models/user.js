const mongoose = require('../server').mongoose;

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  trackedStocks: Array,
});

module.exports.User = mongoose.model('User', userSchema);

