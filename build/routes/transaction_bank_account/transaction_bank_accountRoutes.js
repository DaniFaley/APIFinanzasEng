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
const transactionServices = __importStar(require("../../services/transaction_bank_account/transaction_bank_accountServices"));
const router = express_1.default.Router();
// Mostrar todos los registros
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transactionServices.getTransaction();
    res.send(transaction);
}));
// Mostrar un registro específico
router.get('/:id_transaction_bank_account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transactionServices.findTransaction(Number(req.params.id_transaction_bank_account));
    res.send(transaction);
}));
// Insertar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentary, amount, date, fk_id_user, fk_id_bankAccount_incoming, fk_id_bankAccount_exit } = req.body;
        const nuevo = yield transactionServices.addTransaction({
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount_incoming,
            fk_id_bankAccount_exit
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
        const { id_transaction_bank_account, commentary, amount, date, fk_id_user, fk_id_bankAccount_incoming, fk_id_bankAccount_exit } = req.body;
        const modificado = yield transactionServices.updateTransaction({
            id_transaction_bank_account,
            commentary,
            amount,
            date,
            fk_id_user,
            fk_id_bankAccount_incoming,
            fk_id_bankAccount_exit
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
        const { id_transaction_bank_account } = req.body;
        const eliminado = yield transactionServices.deleteTransaction(Number(id_transaction_bank_account));
        res.send(eliminado);
    }
    catch (e) {
        res.status(400).send("Error al eliminar");
    }
}));
exports.default = router;
