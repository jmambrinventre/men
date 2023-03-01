// var Bicicleta = require('../../models/bicicleta');

// describe("Bicicleta", function(){
//     beforeEach(function(){
//         // Agregamos dos bicicletas a la lista de bicicletas
//         Bicicleta.allBicis = [];
//     });

//     describe("Bicicleta.add", () => {
//         it("Agrega una bicicleta a la lista de bicicletas", () => {
//             var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
//             var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
//             Bicicleta.add(a);
//             Bicicleta.add(b);
//             var newBici = new Bicicleta(3, 'verde', 'urbana', [-34.5950142, -58.3829167]);
//             Bicicleta.add(newBici);
//             expect(Bicicleta.allBicis.length).toBe(3);
//             expect(Bicicleta.allBicis[2].id).toBe(3);
//         });
//     });

//     describe("Bicicleta.findbyId", () => {
//         it("Busca una bicicleta por su id y la devuelve", () => {
//             var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
//             var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
//             Bicicleta.add(a);
//             Bicicleta.add(b);
//             var bici = Bicicleta.findbyId(1);
//             expect(bici).toBeDefined();
//             expect(bici.id).toBe(1);
//             expect(bici.color).toBe('rojo');
//         });

//         it("Devuelve un error si la bicicleta no existe", () => {
//             expect(() => {Bicicleta.findbyId(10)}).toThrowError("No existe una bicicleta con el id 10");
//         });
//     });

//     describe("Bicicleta.removeById", () => {
//         it("Remueve una bicicleta de la lista de bicicletas", () => {
//             var a = new Bicicleta(1, 'rojo', 'urbana', [-34.6012414, -58.3861497]);
//             var b = new Bicicleta(2, 'blanca', 'urbana', [-34.596932, -58.3808287]);
//             Bicicleta.add(a);
//             Bicicleta.add(b);
//             var bici = Bicicleta.findbyId(1);
//             expect(Bicicleta.allBicis.length).toBe(2);

//             Bicicleta.removeById(1);
//             expect(Bicicleta.allBicis.length).toBe(1);
//             expect(() => {Bicicleta.findbyId(1)}).toThrowError("No existe una bicicleta con el id 1");
//         });

//         it("Devuelve un error si la bicicleta no existe", () => {
//             expect(() => {Bicicleta.removeById(10)}).toThrowError("No existe una bicicleta con el id 10");
//         });
//     });
// });