import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';

export default function CartPage() {
  const { cart, items } = useSelector(state => state.products);
  const cartProducts = items.filter(product => cart.includes(product.id));

  return (
      <div className="products-grid">
        {cartProducts.length === 0 ? (
            <p>Нет товаров в корзине</p>
        ) : (
            cartProducts.map(product => (
                <ProductCard key={product.id} product={product} inCartPage />
            ))
        )}
      </div>
  );
}