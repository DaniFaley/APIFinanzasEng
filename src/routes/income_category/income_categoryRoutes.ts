import express, { Request, Response } from 'express';
import * as income_categoryServices from '../../services/income_category/income_categoryServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const income_category = await income_categoryServices.getIncome_Category();
    res.send(income_category);
});

// Mostrar un registro específico
router.get('/:id_incomeCategory', async (req: Request, res: Response) => {
    const income_category = await income_categoryServices.findIncome_Category(Number(req.params.id_incomeCategory));
    res.send(income_category);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name_incomeCategory, fk_id_user } = req.body;
        const nuevo = await income_categoryServices.addIncome_Category({
            name_incomeCategory,
            fk_id_user
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar la cuenta bancaria");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_incomeCategory, name_incomeCategory, fk_id_user } = req.body;
        const modificado = await income_categoryServices.updateIncome_Category({
            id_incomeCategory,
            name_incomeCategory,
            fk_id_user
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("Error en los datos");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_incomeCategory } = req.body;
        const eliminado = await income_categoryServices.deleteIncome_Category(Number(id_incomeCategory));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("Error al eliminar");
    }
});

export default router;