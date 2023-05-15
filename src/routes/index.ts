import { Router } from "express";
import { productsRoutes } from "./products.routes";

export const globalRoutes = Router();

globalRoutes.use("/products", productsRoutes)