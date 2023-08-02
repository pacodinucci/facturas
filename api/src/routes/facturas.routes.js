import { Router } from "express";
import { getFacturas, postFactura } from "../controllers/facturas.controllers.js";

const router = Router();

router.get('/facturas', getFacturas);

router.post('/facturas', postFactura);

// router.put('/facturas', updateFactura);

// router.delete('/facturas', deleteFactura);

export default router;