"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productDB_1 = require("./config/productDB");
const userDB_1 = require("./config/userDB");
const authMiddleware_1 = require("./middleware/authMiddleware");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api/users", authRoutes_1.default);
app.use("/api/products", authMiddleware_1.protectRoute, productRoutes_1.default);
(0, productDB_1.productDB)()
    .then(() => (0, userDB_1.userDB)())
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server started at PORT  ${PORT}`);
    });
});
