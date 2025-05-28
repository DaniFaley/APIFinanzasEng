import express, { Request, Response } from 'express';
import * as expense_typeServices from '../../services/expense_type/expense_typeServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const expense_type = await expense_typeServices.getExpense_Type();
    res.send(expense_type);
});

// Mostrar un registro específico
router.get('/:id_expenseType', async (req: Request, res: Response) => {
    const expense_type = await expense_typeServices.findExpense_Type(Number(req.params.id_expenseType));
    res.send(expense_type);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name_expenseType } = req.body;
        const nuevo = await expense_typeServices.addExpense_Type({
            name_expenseType
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_expenseType, name_expenseType } = req.body;
        const modificado = await expense_typeServices.updateExpense_Type({
            id_expenseType,
            name_expenseType
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede modificar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_expenseType } = req.body;
        const eliminado = await expense_typeServices.deleteExpense_Type(Number(id_expenseType));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;