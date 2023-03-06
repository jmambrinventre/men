const mongoose = require('mongoose');
const Reserva = require('./reserva');

const usuarioSchema = new mongoose.Schema({
  id: Number,
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

// guarda en bdd
usuarioSchema.statics.createInstance = function(id, nombre) {
  return this.create({
    id: id,
    nombre: nombre
  });
};

// this.create()  lo guarda en la bdd
// new this() no lo guarda, para esto, posteriormente se debe colocar el metodo save()

usuarioSchema.methods.toString = function() {
  return 'id: ' + this.id + ' | nombre: ' + this.nombre;
};

usuarioSchema.statics.add = function(usuario) {
  return this.create(usuario);
};

usuarioSchema.statics.allUsuarios = function() {
  return this.find({});
};

usuarioSchema.statics.findById = function(id) {
  return this.findOne({id: id});
};


usuarioSchema.statics.removeById = function(id) {
  return this.deleteOne({id: id});
};

module.exports = mongoose.model('Usuario', usuarioSchema);
