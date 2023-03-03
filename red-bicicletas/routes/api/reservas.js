const express = require('express');
const router = express.Router();
const reservaController = require('../../controllers/api/reservaControllerAPI');

router.get('/', reservaController.reserva_list);
router.post('/create', reservaController.reserva_create);
router.delete('/delete', reservaController.reserva_delete);
router.put('/update', reservaController.reserva_update_post);

module.exports = router;
