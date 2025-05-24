//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Bank_Account, Bank_AccountAgregar} from '../../services/bank_account/bank_accountTypes';
//Importamos las validaciones
import { Bank_AccountSchema } from '../../schema/bank_accountSchema';
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

//Para mostrar todos los registros de la tabla Bank_Account
export const getBank_Account = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM bank_account');
        return results;
    }catch(err){
        return{error: "No se puede obterner el registro"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findBank_Account = async (id_bankAccount:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM bank_account WHERE id_bankAccount = ? LIMIT 1', id_bankAccount);
        return results;
    }catch(err){
        return {error: "No se encontro el registro"};
    }
}
//Para insertar a la tabla bank_account: No se incluye el id de la tabla
export const addBank_Account = async(nuevo:Bank_AccountAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = Bank_AccountSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO bank_account(name_bankAccount,fk_id_user) values (?,?)',[nuevo.name_bankAccount,nuevo.fk_id_user]);
        return results;
    }catch(err){
        return{error: "No se puede agregar el registro"}
    }
}
//Para modificar un registro de la tabla bank_account: Se incluye el id de la tabla al final de los elementos
export const updateBank_Account = async (modificado:Bank_Account) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE bank_account SET name_bankAccount=?,fk_id_user=? WHERE id_bankAccount=?',[modificado.name_bankAccount,modificado.fk_id_user,modificado.id_bankAccount]);
        return results;
    }catch(err){
        return{error: "No se puede modificar el registro"}
    }
}
//Eliminar un registro de la tabla Bank_Account
export const deleteBank_Account = async(id_bankAccount:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM bank_account WHERE id_bankAccount=?',[id_bankAccount]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar el registro"}
    }
}