import React, { useState } from 'react';
import ShowProducts from './ShowProducts';
import ModalCreateProduct from '../components/Formulario/ModalCreateProduct';
import Button from 'react-bootstrap/Button';
import './Home.css';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [refreshProducts, setRefreshProducts] = useState(false); // Estado para forzar la actualización de productos

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setRefreshProducts(prev => !prev); // Alterna el valor para forzar la actualización
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Productos en stock</h1>
            <Button className="add-product-button" onClick={handleShowModal}>
                Agregar Producto
            </Button>
            {/* Pasa la prop `refreshProducts` a ShowProducts para que se actualicen los productos */}
            <ShowProducts refresh={refreshProducts} />
            
            {/* Modal para agregar producto */}
            <ModalCreateProduct show={showModal} onHide={handleCloseModal} />
        </div>
    );
};

export default Home;
