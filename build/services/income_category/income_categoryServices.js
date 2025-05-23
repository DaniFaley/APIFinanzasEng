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
exports.deleteIncome_Category = exports.updateIncome_Category = exports.addIncome_Category = exports.findIncome_Category = exports.getIncome_Category = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
//Importamos las validaciones
const income_categorySchema_1 = require("../../schema/income_categorySchema");
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
//Para mostrar todos los registros de la tabla Income_Category
const getIncome_Category = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM income_category');
        return results;
    }
    catch (err) {
        return { error: "No se puede obterner la income_category" };
    }
});
exports.getIncome_Category = getIncome_Category;
//Para mostrar uno en especifico de la tabla cuenta
const findIncome_Category = (id_incomeCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [results] = yield conexion.query('SELECT * FROM income_category WHERE id_incomeCategory = ? LIMIT 1', id_incomeCategory);
        return results;
    }
    catch (err) {
        return { error: "No se encuentra esa income_category" };
    }
});
exports.findIncome_Category = findIncome_Category;
//Para insertar a la tabla income_category: No se incluye el id de la tabla
const addIncome_Category = (nuevo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Validacion con zod: Lo puedes agregar a cualquier otro try que quieras validar
        const validacion = income_categorySchema_1.Income_CategorySchema.safeParse(nuevo);
        //Si la validacion falla: ! significa lo contrario de exito
        if (!validacion.success) {
            return { error: validacion.error };
        }
        //---------------------
        const [results] = yield conexion.query('INSERT INTO income_category(name_incomeCategory,fk_id_user) values (?,?)', [nuevo.name_incomeCategory, nuevo.fk_id_user]);
        return results;
    }
    catch (err) {
        return { error: "No se puede agregar la income_category" };
    }
});
exports.addIncome_Category = addIncome_Category;
//Para modificar un registro de la tabla income_category: Se incluye el id de la tabla al final de los elementos
const updateIncome_Category = (modificado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('UPDATE income_category SET name_incomeCategory=?,fk_id_user=? WHERE id_incomeCategory=?', [modificado.name_incomeCategory, modificado.fk_id_user, modificado.id_incomeCategory]);
        return results;
    }
    catch (err) {
        return { error: "No se puede modificar income_category" };
    }
});
exports.updateIncome_Category = updateIncome_Category;
//Eliminar un registro de la tabla income_category
const deleteIncome_Category = (id_incomeCategory) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Agregar validaciones
        const [results] = yield conexion.query('DELETE FROM income_category WHERE id_incomeCategory=?', [id_incomeCategory]);
        return results;
    }
    catch (err) {
        return { error: "No se puede eliminar" };
    }
});
exports.deleteIncome_Category = deleteIncome_Category;
