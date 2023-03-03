const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');

describe('Bicicleta model', () => {
    beforeAll((done) => {
        mongoose.connect('mongodb://127.0.0.1:27017/mi-base-de-datos', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Conexión exitosa a la base de datos'))
            .catch((error) => console.error('Error al conectar a la base de datos', error));
        done();
    });

    // afterAll((done) => {
    //     mongoose.connection.db.dropDatabase(() => {
    //     mongoose.connection.close(done);
    //     });
    // });

    afterEach(function() {
        return Bicicleta.deleteMany({})
          .then(function() {
            console.log('Bicicletas eliminadas');
          })
          .catch(function(err) {
            console.log(err);
          });
    });

    describe('Bicicleta.createInstance', () => {
        it('comienza vacía', (done) => {
            const bicis = Bicicleta.allBicis()
                .then((bicis) => {
                    expect(bicis.length).toBe(0); // aseguramos que la variable bicis esté definida antes de acceder a su propiedad length
                    done();
                })
                .catch((err) => {
                    done.fail(err);
                })
        });
    }); 

    describe('Bicicleta.createInstance', () => {
        it('should create a new Bicicleta instance', (done) => {
            const bici = Bicicleta.createInstance(1, "rojo", "urbana", [10.0, 20.0])
                .then((bici) => {
                expect(bici.id).toBe(1);
                expect(bici.color).toBe("rojo");
                expect(bici.modelo).toBe("urbana");
                expect(bici.ubicacion).toEqual([10.0, 20.0]);
                done();
                })
                .catch((err) => {
                done.fail(err); // Si hay un error, falla la prueba y muestra el error
                });
        });
    });  

    describe('Bicicleta.removeById', () => {
        it('should remove a bicicleta by id', async () => {
          const bici = new Bicicleta({id: 1, color: "rojo", modelo: "urbana"});
          await bici.save();
      
          await Bicicleta.removeById(1);
          const bicis = await Bicicleta.allBicis();
          expect(bicis.length).toBe(0);
        });
    });

    describe('Bicicleta.allBicis', () => {
        it('should return an empty array', (done) => {
            Bicicleta.allBicis()
                .then((bicis) => {
                    expect(bicis.length).toBe(0);
                    done();
                }).catch((err) => {
                    console.log(err);
                    done();
                });
        });
    });

    describe('Bicicleta.add', () => {
        it('should add a new Bicicleta', (done) => {
            const bici = new Bicicleta({id: 1, color: "rojo", modelo: "urbana"});
            Bicicleta.add(bici).then((newBici) => {
                Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].id).toEqual(bici.id);
                    done();
                }).catch((err) => {
                    console.log(err);
                    done();
                });
            }).catch((err) => {
                console.log(err);
                done();
            });
        });
    });

});


// //VIEJO

// // var Bicicleta = require('../../models/bicicleta');

// // describe("Bicicleta", function(){
// //     beforeEach(function(){
// //         // Agregamos dos bicicletas a la lista de bicicletas
// //         Bicicleta.allBicis = [];
// //     });

// //     describe("Bicicleta.add", () => {
// //         it("Agrega una bicicleta a la lista de bicicletas", () => {
// //             var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
// //             var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
// //             Bicicleta.add(a);
// //             Bicicleta.add(b);
// //             var newBici = new Bicicleta(3, 'verde', 'urbana', [-34.5950142, -58.3829167]);
// //             Bicicleta.add(newBici);
// //             expect(Bicicleta.allBicis.length).toBe(3);
// //             expect(Bicicleta.allBicis[2].id).toBe(3);
// //         });
// //     });

// //     describe("Bicicleta.findbyId", () => {
// //         it("Busca una bicicleta por su id y la devuelve", () => {
// //             var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
// //             var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
// //             Bicicleta.add(a);
// //             Bicicleta.add(b);
// //             var bici = Bicicleta.findbyId(1);
// //             expect(bici).toBeDefined();
// //             expect(bici.id).toBe(1);
// //             expect(bici.color).toBe('rojo');
// //         });

// //         it("Devuelve un error si la bicicleta no existe", () => {
// //             expect(() => {Bicicleta.findbyId(10)}).toThrowError("No existe una bicicleta con el id 10");
// //         });
// //     });

// //     describe("Bicicleta.removeById", () => {
// //         it("Remueve una bicicleta de la lista de bicicletas", () => {
// //             var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
// //             var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
// //             Bicicleta.add(a);
// //             Bicicleta.add(b);
// //             var bici = Bicicleta.findbyId(1);
// //             expect(Bicicleta.allBicis.length).toBe(2);

// //             Bicicleta.removeById(1);
// //             expect(Bicicleta.allBicis.length).toBe(1);
// //             expect(() => {Bicicleta.findbyId(1)}).toThrowError("No existe una bicicleta con el id 1");
// //         });

// //         it("Devuelve un error si la bicicleta no existe", () => {
// //             expect(() => {Bicicleta.removeById(10)}).toThrowError("No existe una bicicleta con el id 10");
// //         });
// //     });
// // });