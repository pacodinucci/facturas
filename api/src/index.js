import express from "express";
import cors from 'cors';
import facturasRoutes from './routes/facturas.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
  }));

app.use(facturasRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});
