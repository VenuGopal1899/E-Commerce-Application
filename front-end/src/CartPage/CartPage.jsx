import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../_actions';

function CartPage() {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.authentication.user);
    const dispatch = useDispatch();

    const itemsList = cart.items ? cart.items : [];
    const items = itemsList.length ? itemsList.filter(x => x.userName === user.username) : [];

    useEffect(() => {
        dispatch(cartActions.getAll());
    }, []);

    function handleRemoveItem(id) {
        dispatch(cartActions.removeItem(user.username, id));
    }

    function checkout(){
        dispatch(cartActions.checkout());
    }

    var totalBill = 0;
    for(var i=0; i<items.length; i++){
        totalBill = totalBill + (Number(items[i].productQuantity)*items[i].productPrice);
    }

    return (
        <div className="homepageuser-content">
            <nav className="navbar navbar-expand-lg navbar-light bg-light homepageuser-nav">
                <a className="navbar-brand" href="#">Hi {user.firstName}!</a>
                <div className="header-nav-items">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/products">Products</Link></li>
                        <li className="nav-item nav-item-active"><Link className="nav-link" to="/cart">Cart</Link></li>
                        <li className="nav-item"><Link className="nav-link logout" to="/login">Logout</Link></li>
                    </ul>
                </div>
            </nav>
            { items.length ?
                <div className="cart-table container">
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
                    <div className='total-bill container text-center'>
                        <span className='display-5'>Your total bill is : {totalBill}</span>
                        <button onClick={() => checkout()} className="btn btn-outline-success btn-checkout">Place Order</button>
                    </div>
                </div>
                :   <span className="display-4 empty-requests">Wow!! So Clean and Empty XD</span>
            }
        </div>
    );
}

export { CartPage };