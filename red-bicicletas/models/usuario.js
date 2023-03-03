const mongoose = require('mongoose');
const Reserva = require('./reserva');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

usuarioSchema.methods.reservar = function (biciId, desde, hasta) {
    const reserva = new Reserva({ usuario: this._id, bicicleta: biciId, desde, hasta });
    reserva.save((err) => {
      if (err) {
        console.log(err);
      }
    });
};
  

module.exports = mongoose.model('Usuario', usuarioSchema);
