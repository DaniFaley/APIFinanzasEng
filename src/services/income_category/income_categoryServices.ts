//Aqui haremos las conexiones a la base de datos
import mysql from 'mysql2/promise';
import {Income_Category, Income_CategoryAgregar} from '../../services/income_category/income_categoryTypes';
//Importamos las validaciones
import { Income_CategorySchema } from '../../schema/income_categorySchema';
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

//Para mostrar todos los registros de la tabla Income_Category
export const getIncome_Category = async () =>{
    try {
        const [results] = await conexion.query('SELECT * FROM income_category');
        return results;
    }catch(err){
        return{error: "No se puede obtener el registro"};
    }
}
//Para mostrar uno en especifico de la tabla cuenta
export const findIncome_Category = async (id_incomeCategory:number) =>{
    try{
        const [results] = await conexion.query('SELECT * FROM income_category WHERE id_incomeCategory = ? LIMIT 1', id_incomeCategory);
        return results;
    }catch(err){
        return {error: "No se encontro el registro"};
    }
}
//Para insertar a la tabla income_category: No se incluye el id de la tabla
export const addIncome_Category = async(nuevo:Income_CategoryAgregar) => {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = Income_CategorySchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if(!validacion.success){
            return {error: validacion.error};
        }
        //---------------------
        const [results] = await conexion.query('INSERT INTO income_category(name_incomeCategory,fk_id_user) values (?,?)',[nuevo.name_incomeCategory,nuevo.fk_id_user]);
        return results;
    }catch(err){
        return{error: "No se puede agregar el registro"}
    }
}
//Para modificar un registro de la tabla income_category: Se incluye el id de la tabla al final de los elementos
export const updateIncome_Category = async (modificado:Income_Category) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('UPDATE income_category SET name_incomeCategory=?,fk_id_user=? WHERE id_incomeCategory=?',[modificado.name_incomeCategory,modificado.fk_id_user,modificado.id_incomeCategory]);
        return results;
    }catch(err){
        return{error: "No se puede modificar el registro"}
    }
}
//Eliminar un registro de la tabla income_category
export const deleteIncome_Category = async(id_incomeCategory:number) => {
    try {
        //Agregar validaciones
        const [results] = await conexion.query('DELETE FROM income_category WHERE id_incomeCategory=?',[id_incomeCategory]);
        return results;
    }catch(err){
        return {error: "No se puede eliminar el registro"}
    }
}