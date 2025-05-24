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
exports.deleteTransaction = exports.updateTransaction = exports.addTransaction = exports.findTransaction = exports.getTransaction = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const transaction_bank_accountSchema_1 = require("../../schema/transaction_bank_accountSchema");
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
//Para mostrar todos los registros de la tabla Transaction
const getTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM transaction_bank_account');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la Transaction" };
    }
});
exports.getTransaction = getTransaction;
//Para mostrar uno en especifico de la tabla cuenta
const findTransaction = (id_transaction_bank_account) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM transaction_bank_account WHERE id_transaction_bank_account = ? LIMIT 1', id_transaction_bank_account);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa Transaction" };
    }
});
exports.findTransaction = findTransaction;
//Para insertar a la tabla Transaction: No se incluye el id de la tabla
const addTransaction = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = transaction_bank_accountSchema_1.TransactionSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO transaction_bank_account(commentary,amount,date,fk_id_user,fk_id_bankAccount_incoming,fk_id_bankAccount_exit) values (?,?,?,?,?,?)', [nuevo.commentary, nuevo.amount, nuevo.date, nuevo.fk_id_user, nuevo.fk_id_bankAccount_incoming, nuevo.fk_id_bankAccount_exit]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la Transaction" };
    }
});
exports.addTransaction = addTransaction;
//Para modificar un registro de la tabla Transaction: Se incluye el id de la tabla al final de los elementos
const updateTransaction = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE transaction_bank_account SET commentary=?,amount=?,date=?,fk_id_user=?,fk_id_bankAccount_incoming=?,fk_id_bankAccount_exit=? WHERE id_transaction_bank_account=?', [modificado.commentary, modificado.amount, modificado.date, modificado.fk_id_user, modificado.fk_id_bankAccount_incoming, modificado.fk_id_bankAccount_exit, modificado.id_transaction_bank_account]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar Transaction" };
    }
});
exports.updateTransaction = updateTransaction;
//Eliminar un registro de la tabla Transaction
const deleteTransaction = (id_transaction_bank_account) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM transaction_bank_account WHERE id_transaction_bank_account=?', [id_transaction_bank_account]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.deleteTransaction = deleteTransaction;
