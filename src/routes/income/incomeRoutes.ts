import express, { Request, Response } from 'express';
import * as incomeServices from '../../services/income/incomeServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const income = await incomeServices.getIncome();
    res.send(income);
});

// Mostrar un registro específico
router.get('/:id_income', async (req: Request, res: Response) => {
    const income = await incomeServices.findIncome(Number(req.params.id_income));
    res.send(income);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { commentary,amount,date,fk_id_bankAccount,fk_id_incomeCategory } = req.body;
        const nuevo = await incomeServices.addIncome({
            commentary,
            amount,
            date,
            fk_id_bankAccount,
            fk_id_incomeCategory
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_income,commentary,amount,date,fk_id_bankAccount,fk_id_incomeCategory } = req.body;
        const modificado = await incomeServices.updateIncome({
            id_income,
            commentary,
            amount,
            date,
            fk_id_bankAccount,
            fk_id_incomeCategory
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede modificar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_income } = req.body;
        const eliminado = await incomeServices.deleteIncome(Number(id_income));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;