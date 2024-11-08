import React, { useState } from 'react';

const ProductSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (event) => {
        const newSearchTerm = event.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm); // Llama a la función onSearch con el término de búsqueda
    };

    return (
        <div className="search-container mb-3">
            <input
                type="text"
                placeholder="Buscar producto por nombre..."
                value={searchTerm}
                onChange={handleInputChange}
                className="form-control"
            />
        </div>
    );
};

export default ProductSearch;
