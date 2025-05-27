import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
    const items = useSelector(state => state.products.items);

    const [visibleCount, setVisibleCount] = useState(10);

    const handleShowMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    const visibleItems = items.slice(0, visibleCount);

    return (
        <div>
            <div className="products-grid">
                {visibleItems.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {visibleCount < items.length && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={handleShowMore}>Показать ещё</button>
                </div>
            )}
        </div>
    );
}