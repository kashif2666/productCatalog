import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import { Product } from "../models/productModel";

type ProductRow = Product & RowDataPacket;

// Fetch all products
export const getProducts = async (
  limit: number,
  offset: number
): Promise<Product[]> => {
  try {
    const [rows] = await pool.query<ProductRow[]>(
      "SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );
    return rows;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch all products
export const getTotalProducts = async (): Promise<number> => {
  try {
    const [rows] = await pool.query("SELECT COUNT(*) as count FROM products");
    return (rows as any)[0].count;
  } catch (error) {
    console.error("Error count products:", error);
    return 0;
  }
};

// Fetch a single product by ID
export const getProductById = async (id: number): Promise<Product | null> => {
  try {
    const [rows] = await pool.query<ProductRow[]>(
      "SELECT * FROM products WHERE id = ? LIMIT 1",
      [id]
    );

    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
};

export const createProduct = async (
  productData: Omit<Product, "id" | "created_at">
): Promise<Product | null> => {
  const { name, description, price, stock, image } = productData;

  try {
    const [result] = await pool.execute<ResultSetHeader>(
      "INSERT INTO products (name, description, price, stock, image) VALUES (?,?,?,?,?)",
      [name, description, price, stock, image ?? null]
    );
    const insertedId = result.insertId;
    if (!insertedId) {
      throw new Error("Failed to retrive insertId");
    }

    return await getProductById(insertedId);
  } catch (error) {
    console.error("Error in creating product", error);
    return null;
  }
};

export const updateProduct = async (
  id: number,
  productData: Partial<Omit<Product, "id" | "created_at"> & { image?: string }>
): Promise<Product | null> => {
  try {
    const {
      name = null,
      description = null,
      price = null,
      stock = null,
      image = null,
    } = productData;

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE products 
       SET 
         name = COALESCE(?, name), 
         description = COALESCE(?, description), 
         price = COALESCE(?, price), 
         stock = COALESCE(?, stock),
         image = COALESCE(?, image) 
       WHERE id = ?`,
      [name, description, price, stock, image, id]
    );

    if (result.affectedRows === 0) {
      console.warn(`No product found with ID ${id}. Update skipped.`);
      return null;
    }

    return await getProductById(id);
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

export const deleteProduct = async (id: number): Promise<boolean> => {
  try {
    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      console.warn(`No product was found with id ${id}. Delete skipped.`);
      return false;
    }

    console.log(`Product deleted successfully with id ${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    return false;
  }
};
