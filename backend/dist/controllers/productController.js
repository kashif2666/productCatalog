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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const productService = __importStar(require("../services/productService"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productService.getProducts();
        res.status(200).json({ status: 200, success: true, data: products });
        return;
    }
    catch (error) {
        console.log(error);
        res
            .status(500)
            .json({ status: 500, success: false, message: "Internal Server Error" });
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const product = yield productService.getProductById(Number(id));
        product
            ? res.status(200).json({ status: 200, success: true, data: product })
            : res
                .status(404)
                .json({ status: 404, success: false, message: "Product not found" });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, success: false, message: "Internal Server Error" });
    }
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, description, price, stock } = req.body;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    if (!name || !description || !price || !stock || !image) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "All fields are required",
        });
        return;
    }
    try {
        const newProduct = yield productService.createProduct({
            name,
            description,
            price,
            stock,
            image,
        });
        res.status(201).json({ status: 201, success: true, data: newProduct });
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, success: false, message: "Internal Server Error" });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    const productUpdates = Object.assign(Object.assign({}, req.body), { image });
    try {
        const updatedProduct = yield productService.updateProduct(Number(id), productUpdates);
        updatedProduct
            ? res
                .status(200)
                .json({ status: 200, success: true, data: updatedProduct })
            : res
                .status(404)
                .json({ status: 404, success: false, message: "Product not found" });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, success: false, message: "Internal Server Error" });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deleted = yield productService.deleteProduct(Number(id));
        deleted
            ? res.status(200).json({
                status: 200,
                success: true,
                message: "Product deleted successfully",
            })
            : res
                .status(404)
                .json({ status: 404, success: false, message: "Product not found" });
        return;
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, success: false, message: "Internal Server Error" });
    }
});
exports.deleteProduct = deleteProduct;
