const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const reservaSchema = new mongoose.Schema({
  id: Number,
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

// guarda en bdd
// reservaSchema.statics.createInstance = function(id, desde, hasta, bicicleta, usuario) {
//   return this.create({
//     id: id,
//     desde: desde,
//     hasta: hasta,
//     bicicleta: bicicleta,
//     usuario: usuario
//   });
// };

// this.create()  lo guarda en la bdd
// new this() no lo guarda, para esto, posteriormente se debe colocar el metodo save()

reservaSchema.methods.toString = function() {
  return 'id: ' + this.id + ' | desde: ' + this.desde;
};

reservaSchema.statics.add = function(reserva) {
  return this.create(reserva);
};

reservaSchema.statics.allReservas = function() {
  return this.find({});
};

reservaSchema.statics.findById = function(id) {
  return this.findOne({id: id});
};


reservaSchema.statics.removeById = function(id) {
  return this.deleteOne({id: id});
};

module.exports = mongoose.model('Reserva', reservaSchema);