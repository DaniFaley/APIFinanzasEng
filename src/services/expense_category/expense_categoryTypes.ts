export interface Expense_Category{
    id_expenseCategory: number,
    name_expenseCategory: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type Expense_CategoryAgregar = Omit<Expense_Category,'id_expenseCategory'>