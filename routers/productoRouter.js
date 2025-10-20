import express from 'express';
import ProductoController from '../controllers/productoController.js';

const router = express.Router();

router.get('/', ProductoController.obtenerProductos)
router.get('/:id', ProductoController.obtenerProductoPorId)
router.post('/', ProductoController.crearProducto)
router.put('/:id', ProductoController.eliminarProducto)
router.delete('/:id', ProductoController.eliminarProducto)

export default router;