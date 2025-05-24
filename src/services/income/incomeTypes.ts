export interface Income{
    id_income: number,
    commentary: string,
    amount: number,
    date: string,
    fk_id_user: number,
    fk_id_bankAccount: number,
    fk_id_incomeCategory: number
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type IncomeAgregar = Omit<Income,'id_income'>