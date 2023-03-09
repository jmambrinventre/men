const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new mongoose.Schema({
  id: Number,
  token: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: false
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: false
  }
});

module.exports = mongoose.model('Token', tokenSchema);
