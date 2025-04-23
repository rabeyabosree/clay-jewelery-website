import React from 'react'
import { useSelector } from 'react-redux';

function NewProducts() {
    const { items, status, error } = useSelector((state) => state.products);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 1000 * 60);
    const newProducts = items.filter((product) => new Date(product.createdAt) >= thirtyDaysAgo)
    return (
        <div>NewProducts</div>
    )
}

export default NewProducts