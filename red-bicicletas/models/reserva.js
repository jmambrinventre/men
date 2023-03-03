const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const reservaSchema = new mongoose.Schema({
  desde: Date,
  hasta: Date,
  bicicleta: { type: Schema.Types.ObjectId, ref: 'Bicicleta' },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
});

reservaSchema.methods.diasDeReserva = function () {
    const desde = moment(this.desde);
    const hasta = moment(this.hasta);
    const dias = hasta.diff(desde, 'days') + 1; // Se suma 1 porque se cuenta el día de inicio y el de fin
    return dias;
};  

module.exports = mongoose.model('Reserva', reservaSchema);