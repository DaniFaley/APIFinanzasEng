import express, { Request, Response } from 'express';
import * as bank_accountServices from '../../services/bank_account/bank_accountServices';

const router = express.Router();

// Mostrar todos los registros
router.get('/', async (_req: Request, res: Response) => {
    const bank_account = await bank_accountServices.getBank_Account();
    res.send(bank_account);
});

// Mostrar un registro específico
router.get('/:id_bankAccount', async (req: Request, res: Response) => {
    const bank_account = await bank_accountServices.findBank_Account(Number(req.params.id_bankAccount));
    res.send(bank_account);
});

// Insertar
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name_bankAccount, fk_id_user } = req.body;
        const nuevo = await bank_accountServices.addBank_Account({
            name_bankAccount,
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
        const { id_bankAccount, name_bankAccount, fk_id_user } = req.body;
        const modificado = await bank_accountServices.updateBank_Account({
            id_bankAccount,
            name_bankAccount,
            fk_id_user
        });
        res.send(modificado);
    } catch (e) {
        res.status(400).send("No se puede agregar");
    }
});

// Eliminar
router.delete('/', async (req: Request, res: Response) => {
    try {
        const { id_bankAccount } = req.body;
        const eliminado = await bank_accountServices.deleteBank_Account(Number(id_bankAccount));
        res.send(eliminado);
    } catch (e) {
        res.status(400).send("No se puede eliminar");
    }
});

export default router;