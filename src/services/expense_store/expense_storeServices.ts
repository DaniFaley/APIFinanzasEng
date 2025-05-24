//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Expense_Store, Expense_StoreAgregar} from '../../services/expense_store/expense_storeTypes';
//Importamos las validaciones
import { Expense_StoreSchema } from '../../schema/expense_storeSchema';
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

//Para mostrar todos los registros de la tabla Expense_Store
export const getExpense_Store = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM expense_store');
        return results;
    }catch(err){
        return{error: "No se puede obtener el registro"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findExpense_Store = async (id_expenseStore:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM expense_store WHERE id_expenseStore = ? LIMIT 1', id_expenseStore);
        return results;
    }catch(err){
        return {error: "No se encontro el registro"};
    }
}
//Para insertar a la tabla Expense_Store: No se incluye el id de la tabla
export const addExpense_Store = async(nuevo:Expense_StoreAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = Expense_StoreSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO expense_store(name_store,fk_id_user) values (?,?)',[nuevo.name_store,nuevo.fk_id_user]);
        return results;
    }catch(err){
        return{error: "No se puede agregar el registro"}
    }
}
//Para modificar un registro de la tabla Expense_Store: Se incluye el id de la tabla al final de los elementos
export const updateExpense_Store = async (modificado:Expense_Store) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE expense_store SET name_store=?,fk_id_user=? WHERE id_expenseStore=?',[modificado.name_store,modificado.fk_id_user,modificado.id_expenseStore]);
        return results;
    }catch(err){
        return{error: "No se puede modificar el registro"}
    }
}
//Eliminar un registro de la tabla Expense_Store
export const deleteExpense_Store = async(id_expenseStore:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM expense_store WHERE id_expenseStore=?',[id_expenseStore]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar el registro"}
    }
}