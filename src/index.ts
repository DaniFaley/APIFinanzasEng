import express from 'express';
import cors from 'cors';
// Rutas
import bank_accountRoutes from './routes/bank_account/bank_accountRoutes';
import income_categoryRoutes from './routes/income_category/income_categoryRoutes';
import incomeRoutes from './routes/income/incomeRoutes';

// Importar configuración de variables de entorno
import { PORT } from './config';

// Crear la aplicación con Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Usar rutas
app.use('/api/bank_account', bank_accountRoutes);
app.use('/api/income_category', income_categoryRoutes);
app.use('/api/income', incomeRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});