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
exports.deleteExpense_Store = exports.updateExpense_Store = exports.addExpense_Store = exports.findExpense_Store = exports.getExpense_Store = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const expense_storeSchema_1 = require("../../schema/expense_storeSchema");
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
//Para mostrar todos los registros de la tabla Expense_Store
const getExpense_Store = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense_store');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la expense_store" };
    }
});
exports.getExpense_Store = getExpense_Store;
//Para mostrar uno en especifico de la tabla cuenta
const findExpense_Store = (id_expenseStore) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM expense_store WHERE id_expenseStore = ? LIMIT 1', id_expenseStore);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa expense_store" };
    }
});
exports.findExpense_Store = findExpense_Store;
//Para insertar a la tabla Expense_Store: No se incluye el id de la tabla
const addExpense_Store = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = expense_storeSchema_1.Expense_StoreSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO expense_store(name_store,fk_id_user) values (?,?)', [nuevo.name_store, nuevo.fk_id_user]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la expense_store" };
    }
});
exports.addExpense_Store = addExpense_Store;
//Para modificar un registro de la tabla Expense_Store: Se incluye el id de la tabla al final de los elementos
const updateExpense_Store = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE expense_store SET name_store=?,fk_id_user=? WHERE id_expenseStore=?', [modificado.name_store, modificado.fk_id_user, modificado.id_expenseStore]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar expense_store" };
    }
});
exports.updateExpense_Store = updateExpense_Store;
//Eliminar un registro de la tabla Expense_Store
const deleteExpense_Store = (id_expenseStore) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM expense_store WHERE id_expenseStore=?', [id_expenseStore]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.deleteExpense_Store = deleteExpense_Store;
