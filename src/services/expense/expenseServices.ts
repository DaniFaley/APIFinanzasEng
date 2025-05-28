//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Expense, ExpenseAgregar} from '../../services/expense/expenseTypes';
//Importamos las validaciones
import { ExpenseSchema } from '../../schema/expenseSchema';
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

//Para mostrar todos los registros de la tabla Expense
export const getExpense = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM expense');
        return results;
    }catch(err){
        return{error: "No se puede obtener el registro"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findExpense = async (id_expense:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM expense WHERE id_expense = ? LIMIT 1', id_expense);
        return results;
    }catch(err){
        return {error: "No se encontro el registro"};
    }
}
//Para insertar a la tabla Expense: No se incluye el id de la tabla
export const addExpense = async(nuevo:ExpenseAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = ExpenseSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO expense(commentary,amount,date,fk_id_bankAccount,fk_id_expenseCategory,fk_id_expenseType,fk_id_expenseStore) values (?,?,?,?,?,?,?)',[nuevo.commentary,nuevo.amount,nuevo.date,nuevo.fk_id_bankAccount,nuevo.fk_id_expenseCategory,nuevo.fk_id_expenseType,nuevo.fk_id_expenseStore]);
        return results;
    }catch(err){
        return{error: "No se puede agregar el registro"}
    }
}
//Para modificar un registro de la tabla Expense: Se incluye el id de la tabla al final de los elementos
export const updateExpense = async (modificado:Expense) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE expense SET commentary=?,amount=?,date=?,fk_id_bankAccount=?,fk_id_expenseCategory=?,fk_id_expenseType=?,fk_id_expenseStore=? WHERE id_expense=?',[modificado.commentary,modificado.amount,modificado.date,modificado.fk_id_bankAccount,modificado.fk_id_expenseCategory,modificado.fk_id_expenseType,modificado.fk_id_expenseStore,modificado.id_expense]);
        return results;
    }catch(err){
        return{error: "No se puede modificar el registro"}
    }
}
//Eliminar un registro de la tabla Expense
export const deleteExpense = async(id_expense:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM expense WHERE id_expense=?',[id_expense]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar el registro"}
    }
}