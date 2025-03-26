"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("./config/db.js");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
async function productDB() {
    try {
        await (0, db_js_1.sql) `
  CREATE TABLE IF NOT EXISTS products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `;
        console.log("Database connected Successfully.");
    }
    catch (error) {
        console.log(`Error in productDB connection: ${error}`);
    }
}
productDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server new listen at PORT no ${PORT}`);
    });
});
