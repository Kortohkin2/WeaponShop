import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function FavoritesPage() {
  const { favorites, items } = useSelector(state => state.products);
  const favoriteProducts = items.filter(product => favorites.includes(product.id));

  return (
      <div className="products-grid">
        {favoriteProducts.length === 0 ? (
            <p>Нет товаров в избранном</p>
        ) : (
            favoriteProducts.map(product => (
                <ProductCard key={product.id} product={product} inFavoritesPage />
            ))
        )}
      </div>
  );
}