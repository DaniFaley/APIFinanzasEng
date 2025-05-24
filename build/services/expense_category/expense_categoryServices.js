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
exports.deleteExpense_Category = exports.updateExpense_Category = exports.addExpense_Category = exports.findExpense_Category = exports.getExpense_Category = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const expense_categorySchema_1 = require("../../schema/expense_categorySchema");
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
//Para mostrar todos los registros de la tabla Expense_Category
const getExpense_Category = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense_category');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la expense_category" };
    }
});
exports.getExpense_Category = getExpense_Category;
//Para mostrar uno en especifico de la tabla cuenta
const findExpense_Category = (id_expenseCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense_category WHERE id_expenseCategory = ? LIMIT 1', id_expenseCategory);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa expense_category" };
    }
});
exports.findExpense_Category = findExpense_Category;
//Para insertar a la tabla Expense_Category: No se incluye el id de la tabla
const addExpense_Category = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = expense_categorySchema_1.Expense_CategorySchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO expense_category(name_expenseCategory,fk_id_user) values (?,?)', [nuevo.name_expenseCategory, nuevo.fk_id_user]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Expense_Category" };
    }
});
exports.addExpense_Category = addExpense_Category;
//Para modificar un registro de la tabla Expense_Category: Se incluye el id de la tabla al final de los elementos
const updateExpense_Category = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE expense_category SET name_expenseCategory=?,fk_id_user=? WHERE id_expenseCategory=?', [modificado.name_expenseCategory, modificado.fk_id_user, modificado.id_expenseCategory]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar Expense_Category" };
    }
});
exports.updateExpense_Category = updateExpense_Category;
//Eliminar un registro de la tabla Expense_Category
const deleteExpense_Category = (id_expenseCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM expense_category WHERE id_expenseCategory=?', [id_expenseCategory]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.deleteExpense_Category = deleteExpense_Category;
