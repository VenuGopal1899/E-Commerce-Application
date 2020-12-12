import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { requestActions, userActions } from '../_actions';

function RequestsPage() {
    const reqs = useSelector(state => state.requests);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestActions.getAll());
    }, []);

    const requests = reqs.items ? reqs.items : [];

    function approveRequest(req){
        dispatch(requestActions.approveRequest(req.id));
    }

    function rejectRequest(req){
        dispatch(requestActions.rejectRequest(req.id));
    }

    return (
        <div className="homepage-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light homepage-nav">
                <a className="navbar-brand" href="#">Hi {user.firstName}!</a>
                <div className="header-nav-items">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/inventory">Inventory</Link></li>
                        <li className="nav-item nav-item-active"><Link className="nav-link" to="/requests">Requests</Link></li>
                        <li className="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            {requests.length ?
                <div className="requests-table container">
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Product ID</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Requested Quantity</th>
                            <th scope="col">Approve</th>
                            <th scope="col">Reject</th>
                            </tr>
                        </thead>
                        {requests.map((request, index) =>
                            <tbody key={request.id}>
                                <tr>
                                <th scope="row">{index+1}</th>
                                <td>{request.userName}</td>
                                <td>{request.productID}</td>
                                <td>{request.productName}</td>
                                <td>{request.productQuantity}</td>
                                <td><button onClick={ () => approveRequest(request)} className="btn btn-outline-success">Approve</button></td>
                                <td><button onClick={ () => rejectRequest(request)} className="btn btn-outline-danger">Reject</button></td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
                : <span className="display-4 empty-requests">Haven't got any requests yet :)</span>
            }
        </div>
    );
}

export { RequestsPage };