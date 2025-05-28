export interface Expense_Type{
    id_expenseType: number,
    name_expenseType: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type Expense_TypeAgregar = Omit<Expense_Type,'id_expenseType'>