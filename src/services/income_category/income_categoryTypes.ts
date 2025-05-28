export interface Income_Category{
    id_incomeCategory: number,
    name_incomeCategory: string
}
//Para insertar: Tendra todo lo de Personal excepto el id.
export type Income_CategoryAgregar = Omit<Income_Category,'id_incomeCategory'>