import { Router } from "express";
import { getPacks } from "../controllers/packs.controllers";

export const packsRoutes = Router();

packsRoutes.get("", getPacks )