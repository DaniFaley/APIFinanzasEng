//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
import { z } from 'zod';

const descripcionRegEx = new RegExp(/^[a-zA-Z\s]+$/);
// Esquema de validaciones para clientes
export const Expense_CategorySchema = z.object({
    name_expenseCategory: z.string().regex(descripcionRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(30, "Máximo 30 caracteres")
});