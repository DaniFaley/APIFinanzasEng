export interface Bank_Account{
    id_bankAccount: number,
    name_bankAccount: string,
    fk_id_user: number
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type Bank_AccountAgregar = Omit<Bank_Account,'id_bankAccount'>