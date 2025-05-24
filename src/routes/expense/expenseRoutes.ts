import express, { Request, Response } from 'express';
import * as expenseServices from '../../services/expense/expenseServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const expense = await expenseServices.getExpense();
    res.send(expense);
});

// Mostrar un registro específico
router.get('/:id_expense', async (req: Request, res: Response) => {
    const expense = await expenseServices.findExpense(Number(req.params.id_expense));
    res.send(expense);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { commentary,amount,date,fk_id_user,fk_id_bankAccount,fk_id_expenseCategory,fk_id_expenseType,fk_id_expenseStore } = req.body;
        const nuevo = await expenseServices.addExpense({
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount,
            fk_id_expenseCategory,
            fk_id_expenseType,
            fk_id_expenseStore
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_expense, commentary,amount,date,fk_id_user,fk_id_bankAccount,fk_id_expenseCategory,fk_id_expenseType,fk_id_expenseStore } = req.body;
        const modificado = await expenseServices.updateExpense({
            id_expense,
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount,
            fk_id_expenseCategory,
            fk_id_expenseType,
            fk_id_expenseStore
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede modificar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_expense } = req.body;
        const eliminado = await expenseServices.deleteExpense(Number(id_expense));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;