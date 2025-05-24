//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Transaction, TransactionAgregar} from '../../services/transaction_bank_account/transaction_bank_accountTypes';
//Importamos las validaciones
import { TransactionSchema } from '../../schema/transaction_bank_accountSchema';
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

//Para mostrar todos los registros de la tabla Transaction
export const getTransaction = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM transaction_bank_account');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Transaction"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findTransaction = async (id_transaction_bank_account:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM transaction_bank_account WHERE id_transaction_bank_account = ? LIMIT 1', id_transaction_bank_account);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Transaction"};
    }
}
//Para insertar a la tabla Transaction: No se incluye el id de la tabla
export const addTransaction = async(nuevo:TransactionAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = TransactionSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO transaction_bank_account(commentary,amount,date,fk_id_user,fk_id_bankAccount_incoming,fk_id_bankAccount_exit) values (?,?,?,?,?,?)',[nuevo.commentary,nuevo.amount,nuevo.date,nuevo.fk_id_user,nuevo.fk_id_bankAccount_incoming,nuevo.fk_id_bankAccount_exit]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Transaction"}
    }
}
//Para modificar un registro de la tabla Transaction: Se incluye el id de la tabla al final de los elementos
export const updateTransaction = async (modificado:Transaction) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE transaction_bank_account SET commentary=?,amount=?,date=?,fk_id_user=?,fk_id_bankAccount_incoming=?,fk_id_bankAccount_exit=? WHERE id_transaction_bank_account=?',[modificado.commentary,modificado.amount,modificado.date,modificado.fk_id_user,modificado.fk_id_bankAccount_incoming,modificado.fk_id_bankAccount_exit,modificado.id_transaction_bank_account]);
        return results;
    }catch(err){
        return{error: "No se puede modificar Transaction"}
    }
}
//Eliminar un registro de la tabla Transaction
export const deleteTransaction = async(id_transaction_bank_account:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM transaction_bank_account WHERE id_transaction_bank_account=?',[id_transaction_bank_account]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}