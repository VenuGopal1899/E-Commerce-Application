import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { productActions } from '../_actions';
import products from '../assets/products';

function CartPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);

    useEffect(() => {
        dispatch(productActions.getAll());
    }, []);
    const prods = localStorage.getItem('products') || {};
    const products = JSON.parse(prods);

    return (
        <div className="homepageuser-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light homepageuser-nav">
                <a className="navbar-brand" href="#">Hi {user.firstName}!</a>
                <div className="header-nav-items">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                        <li className="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            <div className="products-table container">
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    {products.map((product, index) =>
                        <tbody key={index}>
                            <tr>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export { CartPage };