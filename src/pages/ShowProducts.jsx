import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axios.config';
import Table from '../components/Table/Table';
import ProductSearch from '../components/ProductSearch/ProductSearch';

const ShowProducts = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        axiosInstance.get('/')
            .then(r => {
                if (r.status === 200) {
                    setItems(r.data);
                    setFilteredItems(r.data);
                } else {
                    throw new Error(`[${r.status}] ERROR en la solicitud`);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleSearch = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setFilteredItems(items); // Si el término de búsqueda está vacío, muestra todos los productos
        } else {
            const results = items.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(results);
        }
    };

    const editItem = (id, data) => {
        axiosInstance.put(`/${id}`, data)
            .then(r => {
                if (r.status === 200) {
                    const updatedItems = items.map(item => 
                        item.id === r.data.id ? r.data : item
                    );
                    setItems(updatedItems);
                    setFilteredItems(updatedItems);
                } else {
                    throw new Error(`[ERROR ${r.status}] Error en la solicitud`);
                }
            })
            .catch(err => console.log(err));
    };

    const deleteItem = (id) => {
        const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar "${id}"?`);
        if (!confirmed) return;

        axiosInstance.delete(`/${id}`)
            .then(r => {
                if (r.status === 200) {
                    const updatedItems = items.filter(item => item.id !== id);
                    setItems(updatedItems);
                    setFilteredItems(updatedItems);
                } else {
                    throw new Error(`[ERROR ${r.status}] Error en la solicitud`);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Productos en stock</h1>
            <div className="container mt-3">
                {/* Pasa la función handleSearch a ProductSearch */}
                <ProductSearch onSearch={handleSearch} />

                {filteredItems.length > 0 ? (
                    <Table items={filteredItems} editItem={editItem} deleteItem={deleteItem} />
                ) : (
                    <h2 style={{ textAlign: 'center' }}>No hay productos registrados</h2>
                )}
            </div>
        </div>
    );
};

export default ShowProducts;
