//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Expense_Type, Expense_TypeAgregar} from '../../services/expense_type/expense_typeTypes';
//Importamos las validaciones
import { Expense_TypeSchema } from '../../schema/expense_typeSchema';
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

//Para mostrar todos los registros de la tabla Expense_Type
export const getExpense_Type = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM expense_type');
        return results;
    }catch(err){
        return{error: "No se puede obterner la expense_type"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findExpense_Type = async (id_expenseType:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM expense_type WHERE id_expenseType = ? LIMIT 1', id_expenseType);
        return results;
    }catch(err){
        return {error: "No se encuentra esa expense_type"};
    }
}
//Para insertar a la tabla Expense_Type: No se incluye el id de la tabla
export const addExpense_Type = async(nuevo:Expense_TypeAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = Expense_TypeSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO expense_type(name_expenseType,fk_id_user) values (?,?)',[nuevo.name_expenseType,nuevo.fk_id_user]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la expense_type"}
    }
}
//Para modificar un registro de la tabla Expense_Type: Se incluye el id de la tabla al final de los elementos
export const updateExpense_Type = async (modificado:Expense_Type) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE expense_type SET name_expenseType=?,fk_id_user=? WHERE id_expenseType=?',[modificado.name_expenseType,modificado.fk_id_user,modificado.id_expenseType]);
        return results;
    }catch(err){
        return{error: "No se puede modificar expense_type"}
    }
}
//Eliminar un registro de la tabla Expense_Type
export const deleteExpense_Type = async(id_expenseType:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM expense_type WHERE id_expenseType=?',[id_expenseType]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}