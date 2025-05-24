"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIncome = exports.updateIncome = exports.addIncome = exports.findIncome = exports.getIncome = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const incomeSchema_1 = require("../../schema/incomeSchema");
const config_1 = require("../../config");
//Conexion a la base de datos
const conexion = promise_1.default.createPool({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    port: Number(config_1.DB_PORT),
    multipleStatements: false,
});
exports.default = conexion;
//Para mostrar todos los registros de la tabla Income
const getIncome = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM income');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener el registro" };
    }
});
exports.getIncome = getIncome;
//Para mostrar uno en especifico de la tabla cuenta
const findIncome = (id_income) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM income WHERE id_income = ? LIMIT 1', id_income);
        return results;
    }
    catch (err) {
        return { error: "No se encontro el registro" };
    }
});
exports.findIncome = findIncome;
//Para insertar a la tabla Income: No se incluye el id de la tabla
const addIncome = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = incomeSchema_1.IncomeSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO income(commentary,amount,date,fk_id_user,fk_id_bankAccount,fk_id_incomeCategory) values (?,?,?,?,?,?)', [nuevo.commentary, nuevo.amount, nuevo.date, nuevo.fk_id_user, nuevo.fk_id_bankAccount, nuevo.fk_id_incomeCategory]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el registro" };
    }
});
exports.addIncome = addIncome;
//Para modificar un registro de la tabla Income: Se incluye el id de la tabla al final de los elementos
const updateIncome = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE income SET commentary=?,amount=?,date=?,fk_id_user=?,fk_id_bankAccount=?,fk_id_incomeCategory=? WHERE id_income=?', [modificado.commentary, modificado.amount, modificado.date, modificado.fk_id_user, modificado.fk_id_bankAccount, modificado.fk_id_incomeCategory, modificado.id_income]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar el registro" };
    }
});
exports.updateIncome = updateIncome;
//Eliminar un registro de la tabla Income
const deleteIncome = (id_income) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM income WHERE id_income=?', [id_income]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el registro" };
    }
});
exports.deleteIncome = deleteIncome;
