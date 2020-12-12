import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function HomePage() {
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
                    <ul className="navbar-nav">
                        <li className="nav-item nav-item-active"><Link className="nav-link" to="/users">Users</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/requests">Requests</Link></li>
                        <li className="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            {users.loading && <span className="loader display-5">Loading Users...</span>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <div className="users-table container">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">S.No</th>
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
                                <th scope="row">{index+1}</th>
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

export { HomePage };