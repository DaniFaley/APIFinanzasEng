//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Expense_Category, Expense_CategoryAgregar} from '../../services/expense_category/expense_categoryTypes';
//Importamos las validaciones
import { Expense_CategorySchema } from '../../schema/expense_categorySchema';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } from '../../config';

//Conexion a la base de datos
const conexion = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: Number(DB_PORT),
    multipleStatements: false,
});

export default conexion;

//Para mostrar todos los registros de la tabla Expense_Category
export const getExpense_Category = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM expense_category');
        return results;
    }catch(err){
        return{error: "No se puede obtener el registro"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findExpense_Category = async (id_expenseCategory:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM expense_category WHERE id_expenseCategory = ? LIMIT 1', id_expenseCategory);
        return results;
    }catch(err){
        return {error: "No se encontro el registro"};
    }
}
//Para insertar a la tabla Expense_Category: No se incluye el id de la tabla
export const addExpense_Category = async(nuevo:Expense_CategoryAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = Expense_CategorySchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO expense_category(name_expenseCategory) values (?)',[nuevo.name_expenseCategory]);
        return results;
    }catch(err){
        return{error: "No se puede agregar el registro"}
    }
}
//Para modificar un registro de la tabla Expense_Category: Se incluye el id de la tabla al final de los elementos
export const updateExpense_Category = async (modificado:Expense_Category) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE expense_category SET name_expenseCategory=? WHERE id_expenseCategory=?',[modificado.name_expenseCategory,modificado.id_expenseCategory]);
        return results;
    }catch(err){
        return{error: "No se puede modificar el registro"}
    }
}
//Eliminar un registro de la tabla Expense_Category
export const deleteExpense_Category = async(id_expenseCategory:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM expense_category WHERE id_expenseCategory=?',[id_expenseCategory]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar el registro"}
    }
}