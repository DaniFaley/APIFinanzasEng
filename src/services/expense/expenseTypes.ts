export interface Expense{
    id_expense: number,
    commentary: string,
    amount: number,
    date: string
    fk_id_bankAccount: number,
    fk_id_expenseCategory: number,
    fk_id_expenseType: number,
    fk_id_expenseStore: number
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type ExpenseAgregar = Omit<Expense,'id_expense'>