import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { productActions } from '../_actions';
// import products from '../assets/products';

function HomePageUser() {
    const [item, setItem] = useState({
        requestedProductQuantity: ''
    });
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);

    useEffect(() => {
        dispatch(productActions.getAll());
    }, []);

    const prods = localStorage.getItem('products') || {};
    const products = JSON.parse(prods);

    function handleChange(e) {
        const { name, value } = e.target;
        setItem(i => ({ ...i, [name]: value }));
    }

    function addItemToCart(p){
        console.log('Product added to cart');
        console.log(p);
    }

    function sendRequest(p){
        console.log('Request sent to admin');
        console.log(p);
    }

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
                        <th scope="col">Price per piece</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Add to Cart</th>
                        <th scope="col">Out of Stock</th>
                        </tr>
                    </thead>
                    {products.map((product, index) =>
                        <tbody key={index}>
                            <tr>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td><input type="number" name="requestedProductQuantity" onChange={handleChange}/></td>
                            <td><button onClick={() => addItemToCart(product)} className="btn btn-outline-primary" disabled={!item.requestedProductQuantity || product.quantity < item.requestedProductQuantity}>Add to Cart</button></td>
                            <td><button onClick={() => sendRequest(product)} className="btn btn-outline-success" disabled={product.quantity > item.requestedProductQuantity}>Notify Admin</button></td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export { HomePageUser };