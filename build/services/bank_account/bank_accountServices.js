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
exports.deleteBank_Account = exports.updateBank_Account = exports.addBank_Account = exports.findBank_Account = exports.getBank_Account = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const bank_accountSchema_1 = require("../../schema/bank_accountSchema");
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
//Para mostrar todos los registros de la tabla Bank_Account
const getBank_Account = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM bank_account');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la bank_account" };
    }
});
exports.getBank_Account = getBank_Account;
//Para mostrar uno en especifico de la tabla cuenta
const findBank_Account = (id_bankAccount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM bank_account WHERE id_bankAccount = ? LIMIT 1', id_bankAccount);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa bank_account" };
    }
});
exports.findBank_Account = findBank_Account;
//Para insertar a la tabla bank_account: No se incluye el id de la tabla
const addBank_Account = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = bank_accountSchema_1.Bank_AccountSchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO bank_account(name_bankAccount,fk_id_user) values (?,?)', [nuevo.name_bankAccount, nuevo.fk_id_user]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la bank_account" };
    }
});
exports.addBank_Account = addBank_Account;
//Para modificar un registro de la tabla bank_account: Se incluye el id de la tabla al final de los elementos
const updateBank_Account = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE bank_account SET name_bankAccount=?,fk_id_user=? WHERE id_bankAccount=?', [modificado.name_bankAccount, modificado.fk_id_user, modificado.id_bankAccount]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar bank_account" };
    }
});
exports.updateBank_Account = updateBank_Account;
//Eliminar un registro de la tabla Bank_Account
const deleteBank_Account = (id_bankAccount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM bank_account WHERE id_bankAccount=?', [id_bankAccount]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.deleteBank_Account = deleteBank_Account;
