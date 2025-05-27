import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import FavoritesPage from './pages/FavoritesPage';
import CartPage from './pages/CartPage';
import { Provider } from 'react-redux';
import store from './store';

export default function App() {
  return (
      <Provider store={store}>
        <Router>
          <nav className="main-nav">
            <NavLink to="/">Товары</NavLink>
            <NavLink to="/favorites">Избранное</NavLink>
            <NavLink to="/cart">Корзина</NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </Provider>
  );
}
