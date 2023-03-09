const request = require('request');
const server = require('../../bin/www');
const Bicicleta = require('../../models/bicicleta');
const Usuario = require('../../models/usuario');

describe('Usuario API', () => {
  beforeEach(async () => {
    await Usuario.deleteMany({});
  });

  describe('GET /usuarios', () => {
    it('returns status code 200 and all usuarios', (done) => {
      const usuario1 = new Usuario({ id: 1, nombre: 'Juan' });
      usuario1.save();
      const usuario2 = new Usuario({ id: 2, nombre: 'Pedro' });
      usuario2.save();
      
      request.get('http://localhost:3000/api/usuarios', (error, response, body) => {
        expect(response.statusCode).toBe(200);
        const usuarios = JSON.parse(body).usuarios;
        expect(usuarios.length).toBe(2);
        expect(usuarios[0].nombre).toBe('Juan');
        expect(usuarios[1].nombre).toBe('Pedro');
        done();
      });
    });
  });

  describe('POST /usuarios/create', () => {
    it('adds a new usuario and returns status code 200', (done) => {
      const usuario = { id: 1, nombre: 'Juan' };
      request.post({
        url: 'http://localhost:3000/api/usuarios/create',
        json: true,
        body: usuario
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(body.usuario.nombre).toBe('Juan');
        Usuario.find((err, usuarios) => {
          expect(usuarios.length).toBe(1);
          expect(usuarios[0].nombre).toBe('Juan');
          done();
        });
      });
    });
  });

  describe('POST /usuarios/delete', () => {
    it('deletes an existing usuario and returns status code 204', (done) => {
      const usuario = new Usuario({ id: 1, nombre: 'Juan' });
      usuario.save();
      request.post({
        url: 'http://localhost:3000/api/usuarios/delete',
        json: true,
        body: { _id: usuario._id }
      }, (error, response, body) => {
        expect(response.statusCode).toBe(204);
        Usuario.findById(usuario._id, (err, usuario) => {
          expect(usuario).toBe(null);
          done();
        });
      });
    });
  });

  describe('POST /usuarios/update', () => {
    it('updates an existing usuario and returns status code 200', (done) => {
      const usuario = new Usuario({ id: 1, nombre: 'Juan' });
      usuario.save();
      const update = { _id: usuario._id, nombre: 'Pedro' };
      request.post({
        url: 'http://localhost:3000/api/usuarios/update',
        json: true,
        body: update
      }, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(body.usuario.nombre).toBe('Pedro');
        Usuario.findById(usuario._id, (err, usuario) => {
          expect(usuario.nombre).toBe('Pedro');
          done();
        });
      });
    });
  });
});