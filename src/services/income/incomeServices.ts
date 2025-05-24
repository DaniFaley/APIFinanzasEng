//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Income, IncomeAgregar} from '../../services/income/incomeTypes';
//Importamos las validaciones
import { IncomeSchema } from '../../schema/incomeSchema';
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

//Para mostrar todos los registros de la tabla Income
export const getIncome = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM income');
        return results;
    }catch(err){
        return{error: "No se puede obterner la Income"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findIncome = async (id_income:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM income WHERE id_income = ? LIMIT 1', id_income);
        return results;
    }catch(err){
        return {error: "No se encuentra esa Income"};
    }
}
//Para insertar a la tabla Income: No se incluye el id de la tabla
export const addIncome = async(nuevo:IncomeAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = IncomeSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO income(commentary,amount,date,fk_id_user,fk_id_bankAccount,fk_id_incomeCategory) values (?,?,?,?,?,?)',[nuevo.commentary,nuevo.amount,nuevo.date,nuevo.fk_id_user,nuevo.fk_id_bankAccount,nuevo.fk_id_incomeCategory]);
        return results;
    }catch(err){
        return{error: "No se puede agregar la Income"}
    }
}
//Para modificar un registro de la tabla Income: Se incluye el id de la tabla al final de los elementos
export const updateIncome = async (modificado:Income) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE income SET commentary=?,amount=?,date=?,fk_id_user=?,fk_id_bankAccount=?,fk_id_incomeCategory=?, WHERE id_income=?',[modificado.commentary,modificado.amount,modificado.date,modificado.fk_id_user,modificado.fk_id_bankAccount,modificado.fk_id_incomeCategory,modificado.id_income]);
        return results;
    }catch(err){
        return{error: "No se puede modificar Income"}
    }
}
//Eliminar un registro de la tabla Income
export const deleteIncome = async(id_income:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM income WHERE id_income=?',[id_income]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar"}
    }
}