"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Rutas
const bank_accountRoutes_1 = __importDefault(require("./routes/bank_account/bank_accountRoutes"));
const income_categoryRoutes_1 = __importDefault(require("./routes/income_category/income_categoryRoutes"));
const incomeRoutes_1 = __importDefault(require("./routes/income/incomeRoutes"));
// Importar configuración de variables de entorno
const config_1 = require("./config");
// Crear la aplicación con Express
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Usar rutas
app.use('/api/bank_account', bank_accountRoutes_1.default);
app.use('/api/income_category', income_categoryRoutes_1.default);
app.use('/api/income', incomeRoutes_1.default);
// Iniciar el servidor
app.listen(config_1.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${config_1.PORT}`);
});
