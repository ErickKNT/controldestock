import React from 'react';
import FormCreateProduct from '../components/Formulario/ModalCreateProduct';

const CreateProduct = () => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}> Agregar nuevo producto </h1>
            <FormCreateProduct />
        </div>
    );
}

export default CreateProduct;
