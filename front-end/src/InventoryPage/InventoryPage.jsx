import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';
import products from '../assets/products';

function InventoryPage() {
    const users = useSelector(state => state.users);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.getAll());
    }, []);

    function handleDeleteUser(id) {
        dispatch(userActions.delete(id));
    }

    return (
        <div className="homepage-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light homepage-nav">
                <a className="navbar-brand" href="#">Hi {user.firstName}!</a>
                <div className="header-nav-items">
                    <ul class="navbar-nav">
                        <li class="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                        <li class="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
                        <li class="nav-item"><Link className="nav-link" to="/requests">Requests</Link></li>
                        <li class="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="products-table container">
                <table class="table">
                    <thead className="thead-light">
                        <tr>
                        <th scope="col">Product ID</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity Remaining</th>
                        </tr>
                    </thead>
                    {products.map((product, index) =>
                        <tbody key={index}>
                            <tr>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>

        </div>
    );
}

export { InventoryPage };