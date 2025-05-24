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
exports.deleteExpense_Type = exports.updateExpense_Type = exports.addExpense_Type = exports.findExpense_Type = exports.getExpense_Type = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const expense_typeSchema_1 = require("../../schema/expense_typeSchema");
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
//Para mostrar todos los registros de la tabla Expense_Type
const getExpense_Type = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense_type');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la expense_type" };
    }
});
exports.getExpense_Type = getExpense_Type;
//Para mostrar uno en especifico de la tabla cuenta
const findExpense_Type = (id_expenseType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense_type WHERE id_expenseType = ? LIMIT 1', id_expenseType);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa expense_type" };
    }
});
exports.findExpense_Type = findExpense_Type;
//Para insertar a la tabla Expense_Type: No se incluye el id de la tabla
const addExpense_Type = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = expense_typeSchema_1.Expense_TypeSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO expense_type(name_expenseType,fk_id_user) values (?,?)', [nuevo.name_expenseType, nuevo.fk_id_user]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la expense_type" };
    }
});
exports.addExpense_Type = addExpense_Type;
//Para modificar un registro de la tabla Expense_Type: Se incluye el id de la tabla al final de los elementos
const updateExpense_Type = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE expense_type SET name_expenseType=?,fk_id_user=? WHERE id_expenseType=?', [modificado.name_expenseType, modificado.fk_id_user, modificado.id_expenseType]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar expense_type" };
    }
});
exports.updateExpense_Type = updateExpense_Type;
//Eliminar un registro de la tabla Expense_Type
const deleteExpense_Type = (id_expenseType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM expense_type WHERE id_expenseType=?', [id_expenseType]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.deleteExpense_Type = deleteExpense_Type;
