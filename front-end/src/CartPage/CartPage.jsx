import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../_actions';

function CartPage() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authentication.user);

    useEffect(() => {
        dispatch(cartActions.getAll());
    }, []);
    const its = localStorage.getItem('items') || {};
    const items = JSON.parse(its);

    function handleRemoveItem(id) {
        dispatch(cartActions.removeItem(id));
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
                        <th scope="col">Item No.</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Remove from Cart</th>
                        </tr>
                    </thead>
                    {items.map((item, index) =>
                        <tbody key={index}>
                            <tr>
                            <th scope="row">{index+1}</th>
                            <td>{item.productName}</td>
                            <td>{item.productQuantity}</td>
                            <td>{item.productPrice}</td>
                            <td><button onClick={() => handleRemoveItem(item.productID)} className="btn btn-outline-danger">Remove</button></td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export { CartPage };