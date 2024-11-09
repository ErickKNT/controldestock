import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../services/axios.config';
import Table from '../components/Table/Table';
import ProductSearch from '../components/ProductSearch/ProductSearch';
import { Modal, Button } from 'react-bootstrap';
import './Home.css';

const ShowProducts = ({ refresh }) => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null); // Para almacenar el producto a eliminar

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/');
                if (response.status === 200) {
                    setItems(response.data);
                    setFilteredItems(response.data);
                } else {
                    throw new Error(`[${response.status}] ERROR en la solicitud`);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts(); // Llama a la función para cargar los productos
    }, [refresh]); // Dependencia en `refresh`, se ejecutará cada vez que cambie

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

    const deleteItem = (id, name) => {
        setProductToDelete({ id, name }); // Establece el producto que se va a eliminar
        setShowConfirmModal(true); // Muestra el modal de confirmación
    };

    const confirmDelete = () => {
        axiosInstance.delete(`/${productToDelete.id}`)
            .then(r => {
                if (r.status === 200) {
                    const updatedItems = items.filter(item => item.id !== productToDelete.id);
                    setItems(updatedItems);
                    setFilteredItems(updatedItems);
                    setShowConfirmModal(false); // Cierra el modal
                } else {
                    throw new Error(`[ERROR ${r.status}] Error en la solicitud`);
                }
            })
            .catch(err => console.log(err));
    };

    const cancelDelete = () => {
        setShowConfirmModal(false); // Cierra el modal sin eliminar el producto
        setProductToDelete(null);
    };

    return (
        <div>
            <div className="container mt-3">
                {/* Pasa la función handleSearch a ProductSearch */}
                <ProductSearch onSearch={handleSearch} />

                {filteredItems.length > 0 ? (
                    <Table items={filteredItems} editItem={editItem} deleteItem={deleteItem} />
                ) : (
                    <h2 style={{ textAlign: 'center' }}>No hay productos registrados</h2>
                )}
            </div>

            {/* Modal de confirmación */}
            <Modal show={showConfirmModal} onHide={cancelDelete} className="modal-confirm">
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Mostrar el nombre del producto que se va a eliminar */}
                    <p className='p-productName'>¿Estás seguro de que deseas eliminar el producto "<strong>{productToDelete?.id}</strong>"?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete} className="btn-secondary">
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmDelete} className="btn-danger">
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ShowProducts;
