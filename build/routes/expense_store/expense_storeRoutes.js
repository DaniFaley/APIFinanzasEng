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
const expense_storeServices = __importStar(require("../../services/expense_store/expense_storeServices"));
const router = express_1.default.Router();
// Mostrar todos los registros
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense_store = yield expense_storeServices.getExpense_Store();
    res.send(expense_store);
}));
// Mostrar un registro específico
router.get('/:id_expenseStore', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense_store = yield expense_storeServices.findExpense_Store(Number(req.params.id_expenseStore));
    res.send(expense_store);
}));
// Insertar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name_store, fk_id_user } = req.body;
        const nuevo = yield expense_storeServices.addExpense_Store({
            name_store,
            fk_id_user
        });
        res.send(nuevo);
    }
    catch (e) {
        res.status(400).send("No se puede agregar");
    }
}));
// Modificar
router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_expenseStore, name_store, fk_id_user } = req.body;
        const modificado = yield expense_storeServices.updateExpense_Store({
            id_expenseStore,
            name_store,
            fk_id_user
        });
        res.send(modificado);
    }
    catch (e) {
        res.status(400).send("No se puede modificar");
    }
}));
// Eliminar
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_expenseStore } = req.body;
        const eliminado = yield expense_storeServices.deleteExpense_Store(Number(id_expenseStore));
        res.send(eliminado);
    }
    catch (e) {
        res.status(400).send("No se puede eliminar");
    }
}));
exports.default = router;
