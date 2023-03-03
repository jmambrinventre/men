var Usuario = require('../../models/usuario');

exports.usuario_list = function(req, res){
    Usuario.allUsuarios(function(usuarios){
        res.status(200).json({
            usuarios: usuarios
        });
    });
};

exports.usuario_create = function(req, res){
    var usuario = new Usuario({nombre: req.body.nombre});

    Usuario.add(usuario, function(usuario){
        res.status(200).json({
            usuario: usuario
        });
    });
};

exports.usuario_delete = function(req, res){
    Usuario.removeById(req.body.id, function(){
        res.status(204).send();
    });
};

exports.usuario_update_post = function(req, res){
    Usuario.findById(req.body.id, function(usuario){
        usuario.nombre = req.body.nombre;

        Usuario.update(usuario, function(usuario){
            res.status(200).json({
                usuario: usuario
            });
        });
    });
};
