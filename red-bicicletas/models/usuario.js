const mongoose = require('mongoose');
const Reserva = require('./reserva');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

function validarEmail(email) {
  // Expresión regular para validar el formato del correo electrónico
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Verificar si el correo electrónico cumple con el formato esperado
  if (regex.test(email)) {
    return true; // correo electrónico válido
  } else {
    return false; // correo electrónico inválido
  }
};


const usuarioSchema = new mongoose.Schema({
  id: Number,
  nombre: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio'],
    lowercase: true,
    validate: [validarEmail, 'Por favor ingrese un email valido'],
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/]
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'El password es obligatorio']
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.pre('save', async function() {
  const usuario = this;

  // Verificar si el password se está modificando
  if (!usuario.isModified('password')) {
    return;
  }

  // Generar una sal única para encriptar el password
  const salt = await bcrypt.genSalt(SALT_ROUNDS);

  // Encriptar el password con la sal
  const hash = await bcrypt.hash(usuario.password, salt);

  // Asignar el password encriptado al modelo
  usuario.password = hash;
});

usuarioSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
}

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
