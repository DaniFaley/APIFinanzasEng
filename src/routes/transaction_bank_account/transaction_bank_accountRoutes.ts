import express, { Request, Response } from 'express';
import * as transactionServices from '../../services/transaction_bank_account/transaction_bank_accountServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const transaction = await transactionServices.getTransaction();
    res.send(transaction);
});

// Mostrar un registro específico
router.get('/:id_transaction_bank_account', async (req: Request, res: Response) => {
    const transaction = await transactionServices.findTransaction(Number(req.params.id_transaction_bank_account));
    res.send(transaction);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { commentary,amount,date,fk_id_user,fk_id_bankAccount_incoming,fk_id_bankAccount_exit } = req.body;
        const nuevo = await transactionServices.addTransaction({
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount_incoming,
            fk_id_bankAccount_exit
        });
        res.send(nuevo);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Modificar
router.put('/', async (req: Request, res: Response) => {
    try {
        const { id_transaction_bank_account, commentary,amount,date,fk_id_user,fk_id_bankAccount_incoming,fk_id_bankAccount_exit } = req.body;
        const modificado = await transactionServices.updateTransaction({
            id_transaction_bank_account,
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount_incoming,
            fk_id_bankAccount_exit
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede modificar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_transaction_bank_account } = req.body;
        const eliminado = await transactionServices.deleteTransaction(Number(id_transaction_bank_account));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;