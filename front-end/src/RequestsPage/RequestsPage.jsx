import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function RequestsPage() {
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
                        <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/requests">Requests</Link></li>
                        <li className="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            {users.loading && <span className="loader display-5">Loading Requests...</span>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items &&
                <div className="requests-table container">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">User ID</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                            </tr>
                        </thead>
                        {users.items.map((user, index) =>
                            <tbody key={user.id}>
                                <tr>
                                <th scope="row">User100{user.id}</th>
                                <td>{user.firstName} {user.lastName}</td>
                                <td><button className="btn btn-outline-success">Approve</button></td>
                                <td><button className="btn btn-outline-danger">Reject</button></td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            }
        </div>
    );
}

export { RequestsPage };