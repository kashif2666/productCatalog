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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const db_1 = __importDefault(require("../config/db"));
// Fetch all products
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM products ORDER BY created_at DESC");
        return rows;
    }
    catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
});
exports.getProducts = getProducts;
// Fetch a single product by ID
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM products WHERE id = ? LIMIT 1", [id]);
        return rows.length > 0 ? rows[0] : null;
    }
    catch (error) {
        console.error(`Error fetching product with ID ${id}:`, error);
        return null;
    }
});
exports.getProductById = getProductById;
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, stock, image } = productData;
    try {
        const [result] = yield db_1.default.execute("INSERT INTO products (name, description, price, stock, image) VALUES (?,?,?,?,?)", [name, description, price, stock, image !== null && image !== void 0 ? image : null]);
        const insertedId = result.insertId;
        if (!insertedId) {
            throw new Error("Failed to retrive insertId");
        }
        return yield (0, exports.getProductById)(insertedId);
    }
    catch (error) {
        console.error("Error in creating product", error);
        return null;
    }
});
exports.createProduct = createProduct;
const updateProduct = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name = null, description = null, price = null, stock = null, image = null, } = productData;
        const [result] = yield db_1.default.execute(`UPDATE products 
       SET 
         name = COALESCE(?, name), 
         description = COALESCE(?, description), 
         price = COALESCE(?, price), 
         stock = COALESCE(?, stock),
         image = COALESCE(?, image) 
       WHERE id = ?`, [name, description, price, stock, image, id]);
        if (result.affectedRows === 0) {
            console.warn(`No product found with ID ${id}. Update skipped.`);
            return null;
        }
        return yield (0, exports.getProductById)(id);
    }
    catch (error) {
        console.error("Error updating product:", error);
        return null;
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield db_1.default.execute("DELETE FROM products WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
            console.warn(`No product was found with id ${id}. Delete skipped.`);
            return false;
        }
        console.log(`Product deleted successfully with id ${id}`);
        return true;
    }
    catch (error) {
        console.error(`Error deleting product with ID ${id}:`, error);
        return false;
    }
});
exports.deleteProduct = deleteProduct;
