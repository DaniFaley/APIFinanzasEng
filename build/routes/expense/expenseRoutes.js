"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = __importDefault(require("express"));
const expenseServices = __importStar(require("../../services/expense/expenseServices"));
const router = express_1.default.Router();
// Mostrar todos los registros
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = yield expenseServices.getExpense();
    res.send(expense);
}));
// Mostrar un registro específico
router.get('/:id_expense', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense = yield expenseServices.findExpense(Number(req.params.id_expense));
    res.send(expense);
}));
// Insertar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentary, amount, date, fk_id_user, fk_id_bankAccount, fk_id_expenseCategory, fk_id_expenseType, fk_id_expenseStore } = req.body;
        const nuevo = yield expenseServices.addExpense({
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount,
            fk_id_expenseCategory,
            fk_id_expenseType,
            fk_id_expenseStore
        });
        res.send(nuevo);
    }
    catch (e) {
        res.status(400).send("No se puede agregar la cuenta bancaria");
    }
}));
// Modificar
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_expense, commentary, amount, date, fk_id_user, fk_id_bankAccount, fk_id_expenseCategory, fk_id_expenseType, fk_id_expenseStore } = req.body;
        const modificado = yield expenseServices.updateExpense({
            id_expense,
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount,
            fk_id_expenseCategory,
            fk_id_expenseType,
            fk_id_expenseStore
        });
        res.send(modificado);
    }
    catch (e) {
        res.status(400).send("Error en los datos");
    }
}));
// Eliminar
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_expense } = req.body;
        const eliminado = yield expenseServices.deleteExpense(Number(id_expense));
        res.send(eliminado);
    }
    catch (e) {
        res.status(400).send("Error al eliminar");
    }
}));
exports.default = router;
