const request = require('request');
const Bicicleta = require('../../models/bicicleta');
const server = require('../../bin/www');

describe('Bicicleta API', () => {

    beforeEach(async () => {
        await Bicicleta.deleteMany({});
        var a = new Bicicleta({ id: 1, color: 'verde', modelo: 'urbana' });
        await a.save();
        var b = new Bicicleta({ id: 2, color: 'roja', modelo: 'urbana' });
        await b.save();
    });
    
    describe('GET /api/bicicletas', () => {
    it('devuelve status 200', (done) => {
        request.get('http://localhost:3000/api/bicicletas', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
        });
    });

    it('devuelve una lista de bicicletas', (done) => {
        request.get('http://localhost:3000/api/bicicletas', (error, response, body) => {
        var bicicletas = JSON.parse(body).bicicletas;
        expect(bicicletas.length).toBe(2);
        done();
        });
    });
    });

    describe('POST /api/bicicletas/create', () => {
        it('devuelve status 200', (done) => {
          var headers = { 'content-type': 'application/json' };
          var aBici = { id: 3, color: 'azul', modelo: 'montaña', lat: -34, lng: -54 };
          request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: JSON.stringify(aBici),
          }, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            var bici = JSON.parse(body).bicicleta;
            expect(bici.id).toBe(3);
            expect(bici.color).toBe('azul');
            expect(bici.modelo).toBe('montaña');
            expect(bici.ubicacion[0]).toBe(-34);
            expect(bici.ubicacion[1]).toBe(-54);
            done();
          });
        });
    });
    
    describe('POST /api/bicicletas/:id/update', () => {
    it('devuelve status 200', (done) => {
        var aBici = { id: 1, color: 'negro', modelo: 'urbana', lat: -34, lng: -54 };
        request.put({
        headers: { 'content-type': 'application/json' },
        url: 'http://localhost:3000/api/bicicletas/' + 'update/' + aBici.id,
        body: JSON.stringify(aBici),
        }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        var bici = JSON.parse(body).bicicleta;
        expect(bici.id).toBe(1);
        expect(bici.color).toBe('negro');
        expect(bici.modelo).toBe('urbana');
        expect(bici.ubicacion[0]).toBe(-34);
        expect(bici.ubicacion[1]).toBe(-54);
        done();
        });
    });
    });
    
});


// var request = require('request');
// var Bicicleta = require('../../models/bicicleta');
// // var base_url = "http://localhost:3000/api/bicicletas";
// var server = require('../../bin/www');

// describe('Bicicleta API', () => {
//     beforeEach(() => {  
//         Bicicleta.allBicis = [];
//         Bicicleta.nextId = 1;
//     });

//     describe('GET BICICLETAS /', () => {
//         it('Status 200', (done) => {

//             var a = new Bicicleta(1, 'negro', 'urbana', [-34.603740, -58.381570]);
//             Bicicleta.add(a);

//             request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
//                 expect(response.statusCode).toBe(200);
//                 done();
//             });
//         });
//     });
//     describe('POST BICICLETAS /create', () => {
//         it('Status 200', (done) => {

//           var headers = {'content-type': 'application/json'};
//           var aBici = '{"id": 1, "color": "rojo", "modelo": "urbana", "lat": -34.603740, "lng": -58.381570}';
//           request.post({
//             headers: headers,
//             url: 'http://localhost:3000/api/bicicletas/create',
//             body: aBici
//           }, function(error, response, body){
//             expect(response.statusCode).toBe(200);
//             expect(Bicicleta.findbyId(1).color).toBe('rojo');
//             expect(Bicicleta.length).toBe(4);
//             done();
//           });
//         });
//     });
    
//     describe('POST BICICLETAS /update', () => {
//     it('Status 200', (done) => {
//         var a = new Bicicleta(1, 'negro', 'urbana', [-34.603740, -58.381570]);
//         Bicicleta.add(a);

//         var headers = {'content-type': 'application/json'};
//         var updatedBici = '{"id": 1, "color": "rojo", "modelo": "urbana", "lat": -34.603740, "lng": -58.381570}';
//         request.put({
//             headers: headers,
//             url: 'http://localhost:3000/api/bicicletas/update',
//             body: updatedBici
//         }, function(error, response, body){
//             expect(response.statusCode).toBe(200);
//             expect(Bicicleta.findbyId(1).color).toBe('rojo');
//             done();
//         });
//     });
//     });

//     describe('POST BICICLETAS /delete', () => {
//     it('Status 204', (done) => {
//         var a = new Bicicleta(1, 'negro', 'urbana', [-34.603740, -58.381570]);
//         Bicicleta.add(a);

//         var headers = {'content-type': 'application/json'};
//         var deleteBici = '{"id": 1}';
//         request.delete({
//             headers: headers,
//             url: 'http://localhost:3000/api/bicicletas/delete',
//             body: deleteBici
//         }, function(error, response, body){
//             expect(response.statusCode).toBe(204);
//             expect(Bicicleta.allBicis.length).toBe(0);
//             done();
//         });
//     });
//     });
// });