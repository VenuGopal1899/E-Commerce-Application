import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { productActions, requestActions, cartActions } from '../_actions';

function HomePageUser() {
    const prods = useSelector(state => state.products);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getAll());
    }, []);

    const products = prods.items ? prods.items : [];

    const [i, setItem] = useState({
        requestedProductQuantity: ''
    });

    const item = {
        userName: '',
        productID: '',
        productName: '',
        productPrice: '',
        productQuantity: ''
    };

    const request = {
        userName: '',
        productID: '',
        productName: '',
        productQuantity: ''
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setItem(i => ({ ...i, [name]: value }));
    }

    function addItemToCart(p){
        item.userName = user.username;
        item.productID = p.id;
        item.productName = p.name;
        item.productPrice = p.price;
        item.productQuantity = i.requestedProductQuantity;
        dispatch(cartActions.addItem(item));
    }

    function sendRequest(p){
        request.userName = user.username;
        request.productID = p.id;
        request.productName = p.name;
        request.productQuantity = i.requestedProductQuantity;
        dispatch(requestActions.addRequest(request));
    }

    return (
        <div className="homepageuser-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light homepageuser-nav">
                <a className="navbar-brand" href="#">Hi {user.firstName}!</a>
                <div className="header-nav-items">
                    <ul className="navbar-nav">
                        <li className="nav-item nav-item-active"><Link className="nav-link" to="/products">Products</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                        <li className="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            { prods.loading && <span className="loader display-5">Loading Products...</span>}
            { prods.items &&
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
                                <td><input type="number" name="requestedProductQuantity" min="0" onChange={handleChange}/></td>
                                <td><button onClick={() => addItemToCart(product)} className="btn btn-outline-primary" disabled={(!i.requestedProductQuantity) || (i.requestedProductQuantity <= 0) || (product.quantity<i.requestedProductQuantity)}>Add to Cart</button></td>
                                <td><button onClick={() => sendRequest(product)} className="btn btn-outline-success" disabled={(!i.requestedProductQuantity) || (product.quantity>=i.requestedProductQuantity)}>Notify Admin</button></td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            }
        </div>
    );
}

export { HomePageUser };