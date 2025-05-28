import express, { Request, Response } from 'express';
import * as expense_storeServices from '../../services/expense_store/expense_storeServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const expense_store = await expense_storeServices.getExpense_Store();
    res.send(expense_store);
});

// Mostrar un registro específico
router.get('/:id_expenseStore', async (req: Request, res: Response) => {
    const expense_store = await expense_storeServices.findExpense_Store(Number(req.params.id_expenseStore));
    res.send(expense_store);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name_store } = req.body;
        const nuevo = await expense_storeServices.addExpense_Store({
            name_store
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_expenseStore, name_store } = req.body;
        const modificado = await expense_storeServices.updateExpense_Store({
            id_expenseStore,
            name_store
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede modificar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_expenseStore } = req.body;
        const eliminado = await expense_storeServices.deleteExpense_Store(Number(id_expenseStore));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;