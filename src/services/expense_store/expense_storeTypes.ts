export interface Expense_Store{
    id_expenseStore: number,
    name_store: string,
    fk_id_user: number
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type Expense_StoreAgregar = Omit<Expense_Store,'id_expenseStore'>