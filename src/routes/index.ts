import { Router } from "express";
import { productsRoutes } from "./products.routes";
import { packsRoutes } from "./packs.routes";

export const globalRoutes = Router();

globalRoutes.use("/products", productsRoutes)
globalRoutes.use("/packs", packsRoutes)