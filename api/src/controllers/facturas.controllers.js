import { pool } from '../db.js';

export const getFacturas = async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM facturas');
    res.json(rows);
};

export const postFactura = async (req, res) => {
    const {nro, concepto, total, descripcion} = req.body;
    const [rows] = await pool.query('INSERT INTO facturas (nro, concepto, total, descripcion) VALUES (?, ?, ?, ?)', [nro, concepto, total, descripcion]);
    res.json({
        id: rows.insertId,
        nro,
        concepto,
        total,
        descripcion
    });
};

export const updateFactura = async (req, res) => {
    
}