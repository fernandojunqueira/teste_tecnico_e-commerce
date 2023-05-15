import { Router } from "express";
import { getProducts } from "../controllers/products.controllers";

export const productsRoutes = Router();

productsRoutes.get("", getProducts)