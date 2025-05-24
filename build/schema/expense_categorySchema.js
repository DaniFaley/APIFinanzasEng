"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expense_CategorySchema = void 0;
//Validaciones
//Importamos el paquete (zod): Sirve para validar los datos que ingresa el usuario sean seguros y correctos
const zod_1 = require("zod");
const descripcionRegEx = new RegExp(/^[a-zA-Z\s]+$/);
// Esquema de validaciones para clientes
exports.Expense_CategorySchema = zod_1.z.object({
    name_expenseCategory: zod_1.z.string().regex(descripcionRegEx, {
        message: "El nombre solo puede contener letras y espacios."
    }).min(2, "Mínimo 2 caracteres").max(30, "Máximo 30 caracteres")
});
