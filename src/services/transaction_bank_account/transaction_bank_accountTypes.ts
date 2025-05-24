export interface Transaction{
    id_transaction_bank_account: number,
    commentary: string,
    amount: number,
    date: string,
    fk_id_user: number,
    fk_id_bankAccount_incoming: number,
    fk_id_bankAccount_exit: number
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type TransactionAgregar = Omit<Transaction,'id_transaction_bank_account'>