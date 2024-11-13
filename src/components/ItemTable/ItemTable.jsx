import React, { useState } from 'react';
import Modal from '../Modal/Modal';

const ItemTable = ({ item, editItem, deleteItem, viewProductDetails }) => {
    const { name, price, stock, id } = item;
    const [modalShow, setModalShow] = useState(false);

    /**
     * Función para manejar la confirmación y eliminación del item.
     * Llama a la función `deleteItem` pasando el ID del item.
     */
    const handleDelete = () => {
        deleteItem(id);  // Elimina el item pasando su id
    };

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{price}</td>
                <td>{stock}</td>
                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    {/* Icono de lápiz para editar el item */}
                    <i
                        style={{ cursor: 'pointer' }}
                        className="bi bi-pencil-square"
                        onClick={() => setModalShow(true)} // Muestra el modal para editar
                    ></i>

                    {/* Icono de papelera para eliminar el item */}
                    <i
                        style={{ cursor: 'pointer', color: 'white' }}
                        className="bi bi-trash3-fill"
                        onClick={handleDelete} // Elimina el item
                    ></i>
                </td>
            </tr>

            {/* Modal para editar el producto */}
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                item={item}
                onSubmit={editItem}
            />
        </>
    );
};

export default ItemTable;
