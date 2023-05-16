import { Router } from "express";
import { dataValidation, getProducts } from "../controllers/products.controllers";
import multer from "multer"

const multerConfig = multer()

export const productsRoutes = Router();

productsRoutes.get("", getProducts)
productsRoutes.get("/validation", multerConfig.single("file"), dataValidation)