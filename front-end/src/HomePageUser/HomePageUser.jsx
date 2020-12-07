import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePageUser() {
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
        <div className="homepageuser-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light homepageuser-nav">
                <a className="navbar-brand" href="#">Hi {user.firstName}!</a>
                <div className="header-nav-items">
                    <ul class="navbar-nav">
                        <li class="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                        <li class="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
                        <li class="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            {users.loading && <span className="display-5">Loading users...</span>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <div className="users-table container">
                    <table class="table">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Mail</th>
                            <th scope="col">Contact No</th>
                            <th scope="col">Remove User</th>
                            </tr>
                        </thead>
                        {users.items.map((user, index) =>
                            <tbody key={user.id}>
                                <tr>
                                <th scope="row">User100{user.id}</th>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.mail}</td>
                                <td>{user.phoneno}</td>
                                <td><button onClick={() => handleDeleteUser(user.id)} className="btn btn-outline-danger">Delete</button></td>
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