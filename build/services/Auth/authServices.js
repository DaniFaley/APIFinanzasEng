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
exports.loginUser = void 0;
//Aqui haremos las conexiones a la base de datos
const promise_1 = __importDefault(require("mysql2/promise"));
const config_1 = require("../../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Conexion a la base de datos
const conexion = promise_1.default.createPool({
    host: config_1.DB_HOST,
    user: config_1.DB_USER,
    password: config_1.DB_PASSWORD,
    database: config_1.DB_NAME,
    port: Number(config_1.DB_PORT),
    multipleStatements: false,
});
const SECRET_KEY = 'tu_clave_secreta'; // usar process.env en producción
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield conexion.query('SELECT * FROM user WHERE email = ? LIMIT 1', [email]);
        const user = rows[0];
        if (!user) {
            return { error: 'Usuario no encontrado' };
        }
        const validPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return { error: 'Contraseña incorrecta' };
        }
        const token = jsonwebtoken_1.default.sign({ id_user: user.id_user, email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });
        return { token, user: { id_user: user.id_user, name: user.name, email: user.email } };
    }
    catch (error) {
        return { error: 'Error en el login' };
    }
});
exports.loginUser = loginUser;
