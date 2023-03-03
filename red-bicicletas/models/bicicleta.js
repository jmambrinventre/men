var mongoose = require('mongoose');

var bicicletaSchema = new mongoose.Schema({
    id: Number,
    color: String,
    modelo: String,
    ubicacion: {
      type: [Number],  // [longitud, latitud]
      index: '2dsphere'  // para habilitar búsquedas geoespaciales
    }
});

// guarda en bdd
bicicletaSchema.statics.createInstance = function(id, color, modelo, ubicacion) {
    return this.create({
      id: id,
      color: color,
      modelo: modelo,
      ubicacion: ubicacion
    });
};

// this.create()  lo guarda en la bdd
// new this() no lo guarda, para esto, posteriormente se debe colocar el metodo save()

bicicletaSchema.methods.toString = function() {
    return 'id: ' + this.id + ' | color: ' + this.color;
};

bicicletaSchema.statics.add = function(bici) {
    return this.create(bici);
};

bicicletaSchema.statics.allBicis = function() {
    return this.find({});
};

bicicletaSchema.statics.findById = function(id) {
    return this.findOne({id: id});
};


bicicletaSchema.statics.removeById = function(id) {
    return this.deleteOne({id: id});
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);



// module.exports = mongoose.model('Bicicleta', BicicletaSchema);


//VIEJO

// var Bicicleta = function (id, color, modelo, ubicacion) {
//     this.id = id;
//     this.color = color;
//     this.modelo = modelo;
//     this.ubicacion = ubicacion;
// }

// Bicicleta.prototype.toString = function (){
//     return 'id: ' + this.id + " | color: " + this.color;
// }

// Bicicleta.allBicis = [];

// Bicicleta.add = function(aBici){
//     Bicicleta.allBicis.push(aBici);
// };

// Bicicleta.findbyId = function(aBiciId){
//     var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);

//     if (aBici)
//         return aBici;
//     else
//         throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
// }

// Bicicleta.removeById = function(aBiciId){
//     Bicicleta.findbyId(aBiciId);

//     for (var i = 0; i < Bicicleta.allBicis.length; i++){
//         if (Bicicleta.allBicis[i].id == aBiciId){
//             Bicicleta.allBicis.splice(i,1);
//             break;
//         }
//     }
// }

// module.exports = Bicicleta
// var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
// var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);

// Bicicleta.add(a);
// Bicicleta.add(b);
