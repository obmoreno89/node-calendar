/*

event routes 
/api/events


*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();
const {
  getEvento,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require('../controllers/events');
const { check } = require('express-validator');

//Toldas tienen que pasar por la validacion del JWT
router.use(validarJWT);

//Obtener eventos
router.get('/', getEvento);

//Crear un nuevo evento
router.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    validarCampos,
  ],
  crearEvento
);

//Actualizar evento
router.put('/:id', actualizarEvento);

//Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;
