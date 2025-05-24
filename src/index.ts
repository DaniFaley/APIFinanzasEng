import express from 'express';
import cors from 'cors';
// Rutas
import bank_accountRoutes from './routes/bank_account/bank_accountRoutes';
import income_categoryRoutes from './routes/income_category/income_categoryRoutes';
import incomeRoutes from './routes/income/incomeRoutes';
import expense_categoryRoutes from './routes/expense_category/expense_categoryRoutes';
import expense_typeRoutes from './routes/expense_type/expense_typeRoutes';
import expense_storeRoutes from './routes/expense_store/expense_storeRoutes';
import expense from './routes/expense/expenseRoutes';
import transaction from './routes/transaction_bank_account/transaction_bank_accountRoutes';

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
app.use('/api/expense_category', expense_categoryRoutes);
app.use('/api/expense_type', expense_typeRoutes);
app.use('/api/expense_store', expense_storeRoutes);
app.use('/api/expense', expense);
app.use('/api/transaction', transaction);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});