import VentaDAO from '../dao/VentaDAO.js';
import { AppError } from '../utils/appError.js';

class VentaController {
    static async crearVenta(req, res, next) {
        try {
            const { total, iva, productosVenta } = req.body;

            if (!total || !iva || !productosVenta) {
                return next(new AppError('Los campos total e iva son requeridos.', 400))
            }

            const ventaData = { total, iva, productosVenta }
            const venta = await VentaDAO.crearVenta(ventaData)
            res.status(201).json(venta);

        } catch (error) {
            next(new AppError('Ocurrió un error al crear la venta.', 500))
        }
    }

    static async agregarProductosAVenta(req, res, next) {
        try {
            const idVenta = req.params.id;
            const productos = req.body.productos;

            if(!productos || !Array.isArray(productos) || productos.length === 0) {
                return next(new AppError('Se requiere una lista de productos.', 400))
            }

            const ventaConProductos = await VentaDAO.agregaProductosAVenta(idVenta, productos);
            res.status(200).json(ventaConProductos);
            
        } catch (error) {
            next(new AppError('Ocurrió un error al agregar los productos a la venta.', 500))
        }
    }
}