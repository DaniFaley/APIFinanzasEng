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
const expense_categoryServices = __importStar(require("../../services/expense_category/expense_categoryServices"));
const router = express_1.default.Router();
// Mostrar todos los registros
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense_category = yield expense_categoryServices.getExpense_Category();
    res.send(expense_category);
}));
// Mostrar un registro específico
router.get('/:id_expenseCategory', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const expense_category = yield expense_categoryServices.findExpense_Category(Number(req.params.id_expenseCategory));
    res.send(expense_category);
}));
// Insertar
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name_expenseCategory } = req.body;
        const nuevo = yield expense_categoryServices.addExpense_Category({
            name_expenseCategory
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
        const { id_expenseCategory, name_expenseCategory } = req.body;
        const modificado = yield expense_categoryServices.updateExpense_Category({
            id_expenseCategory,
            name_expenseCategory
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
        const { id_expenseCategory } = req.body;
        const eliminado = yield expense_categoryServices.deleteExpense_Category(Number(id_expenseCategory));
        res.send(eliminado);
    }
    catch (e) {
        res.status(400).send("No se puede eliminar");
    }
}));
exports.default = router;
