import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, addToFavorites, removeFromCart, removeFromFavorites} from '../store/productsSlice';
import placeholder from '../assets/placeholder.png';

export default function ProductCard({ product, inCartPage, inFavoritesPage }) {
    const dispatch = useDispatch();
    const { cart, favorites } = useSelector(state => state.products);

    const isInCart = cart.includes(product.id);
    const isInFavorites = favorites.includes(product.id);

    const handleCartClick = () => {
        if (inCartPage) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product.id));
        }
    };

    const handleFavoritesClick = () => {
        if (inFavoritesPage) {
            dispatch(removeFromFavorites(product.id));
        } else {
            dispatch(addToFavorites(product.id));
        }
    };

    return (
        <div className="product-card">
            <div className="product-image">
                <img
                    src={product.preview_picture || placeholder}
                    alt={product.name}
                />
            </div>

            <div className="product-title">
                <h3>{product.name}</h3>
            </div>

            <div className="product-price">
                <strong>{product.price_discount} ₽</strong>
                {product.price_discount < product.price && (
                    <span className="old-price">{product.price} ₽</span>
                )}
            </div>

            <div className="labels">
                {product.labels?.discount && <div className="label">{product.labels.discount}</div>}
                {product.labels?.new && <div className="label new">{product.labels.new}</div>}
            </div>

            <div className="product-actions">
                {inFavoritesPage ? (
                    <>
                        <button
                            disabled={!product.available || isInCart}
                            onClick={handleCartClick}
                        >
                            {!product.available ? 'Отсутствует' : isInCart ? 'В корзине' : 'В корзину'}
                        </button>
                        <button onClick={handleFavoritesClick}>
                            Удалить из избранного
                        </button>
                    </>
                ) : inCartPage ? (
                    <button onClick={handleCartClick}>Удалить из корзины</button>
                ) : (
                    <>
                        <button
                            disabled={!product.available || isInCart}
                            onClick={handleCartClick}
                        >
                            {!product.available ? 'Отсутствует' : isInCart ? 'В корзине' : 'В корзину'}
                        </button>
                        <button
                            disabled={!product.available || isInFavorites}
                            onClick={handleFavoritesClick}
                        >
                            {isInFavorites ? 'В избранном' : 'В избранное'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
