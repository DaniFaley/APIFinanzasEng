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
exports.deleteExpense = exports.updateExpense = exports.addExpense = exports.findExpense = exports.getExpense = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const expenseSchema_1 = require("../../schema/expenseSchema");
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
//Para mostrar todos los registros de la tabla Expense
const getExpense = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense');
        return results;
    }
    catch (err) {
        return { error: "No se puede obtener el registro" };
    }
});
exports.getExpense = getExpense;
//Para mostrar uno en especifico de la tabla cuenta
const findExpense = (id_expense) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense WHERE id_expense = ? LIMIT 1', id_expense);
        return results;
    }
    catch (err) {
        return { error: "No se encontro el registro" };
    }
});
exports.findExpense = findExpense;
//Para insertar a la tabla Expense: No se incluye el id de la tabla
const addExpense = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = expenseSchema_1.ExpenseSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO expense(commentary,amount,date,fk_id_user,fk_id_bankAccount,fk_id_expenseCategory,fk_id_expenseType,fk_id_expenseStore) values (?,?,?,?,?,?,?,?)', [nuevo.commentary, nuevo.amount, nuevo.date, nuevo.fk_id_user, nuevo.fk_id_bankAccount, nuevo.fk_id_expenseCategory, nuevo.fk_id_expenseType, nuevo.fk_id_expenseStore]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar el registro" };
    }
});
exports.addExpense = addExpense;
//Para modificar un registro de la tabla Expense: Se incluye el id de la tabla al final de los elementos
const updateExpense = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE expense SET commentary=?,amount=?,date=?,fk_id_user=?,fk_id_bankAccount=?,fk_id_expenseCategory=?,fk_id_expenseType=?,fk_id_expenseStore=? WHERE id_expense=?', [modificado.commentary, modificado.amount, modificado.date, modificado.fk_id_user, modificado.fk_id_bankAccount, modificado.fk_id_expenseCategory, modificado.fk_id_expenseType, modificado.fk_id_expenseStore, modificado.id_expense]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar el registro" };
    }
});
exports.updateExpense = updateExpense;
//Eliminar un registro de la tabla Expense
const deleteExpense = (id_expense) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM expense WHERE id_expense=?', [id_expense]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar el registro" };
    }
});
exports.deleteExpense = deleteExpense;
