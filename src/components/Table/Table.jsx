import React from 'react';
import TableBs from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';
import './table.css';

const Table = ({ items, editItem, deleteItem }) => {
    return (
        <div className="table-container">
            <TableBs striped bordered hover variant="dark" className="table-responsive">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <ItemTable item={item} key={i} editItem={editItem} deleteItem={deleteItem} />
                    ))}
                </tbody>
            </TableBs>
        </div>
    );
};

export default Table;
