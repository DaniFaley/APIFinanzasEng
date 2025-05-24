import express, { Request, Response } from 'express';
import * as expense_categoryServices from '../../services/expense_category/expense_categoryServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const expense_category = await expense_categoryServices.getExpense_Category();
    res.send(expense_category);
});

// Mostrar un registro específico
router.get('/:id_expenseCategory', async (req: Request, res: Response) => {
    const expense_category = await expense_categoryServices.findExpense_Category(Number(req.params.id_expenseCategory));
    res.send(expense_category);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name_expenseCategory, fk_id_user } = req.body;
        const nuevo = await expense_categoryServices.addExpense_Category({
            name_expenseCategory,
            fk_id_user
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_expenseCategory, name_expenseCategory, fk_id_user } = req.body;
        const modificado = await expense_categoryServices.updateExpense_Category({
            id_expenseCategory,
            name_expenseCategory,
            fk_id_user
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede modificar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_expenseCategory } = req.body;
        const eliminado = await expense_categoryServices.deleteExpense_Category(Number(id_expenseCategory));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;