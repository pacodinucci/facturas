import React, { useEffect, useRef, useState } from "react"
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-responsive'
import axios from 'axios';
import styles from './App.css';



function App() {
 

    const tableRef = useRef()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nro, setNro] = useState("");
    const [concepto, setConcepto] = useState("");
    const [total, setTotal] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/facturas');
              const data = response.data;
              console.log(data)

              console.log(tableRef.current);
              const table = $(tableRef.current).DataTable({
                  data: data, 
                  columns: [
                      { data: "nro", title: "Numero comprobante" },
                      { data: "concepto", title: "Concepto" },
                      { data: "total", title: "Total" },
                      { data: "descripcion", title: "Descripción." },
                  ],
                  destroy: true,
                  responsive: true
              });

              return function () {
                  console.log("Table destroyed");
                  table.destroy();
              };
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();
    }, []);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleGuardar = async () => {
        try {
            const response = await axios.post("http://localhost:3000/facturas", {
                nro,
                concepto,
                total,
                descripcion
            });

            console.log("Comprobante agregado:", response.data);

            // Cerrar el modal y reiniciar los campos
            closeModal();
            setNro("");
            setConcepto("");
            setTotal("");
            setDescripcion("");
        } catch (error) {
            console.error("Error al agregar comprobante:", error);
        }
    };
    
    return (
        <>
          <div>
            <table className={`${styles.display} ${styles.compact}`} width="90%" ref={ tableRef }></table>
          </div>
          <button onClick={openModal}>Agregar comprobante</button>

          {/* Modal */}
          {isModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <input type="text" placeholder="Número de comprobante" value={nro} onChange={e => setNro(e.target.value)} />
                        <input type="text" placeholder="Concepto" value={concepto} onChange={e => setConcepto(e.target.value)} />
                        <input type="text" placeholder="Total" value={total} onChange={e => setTotal(e.target.value)} />
                        <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                        <button onClick={handleGuardar}>Guardar</button>
                    </div>
                </div>
            )}
        </>
         
    )
}

export default App;
