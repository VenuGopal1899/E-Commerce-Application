import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { InventoryPage } from '../InventoryPage';
import { RequestsPage } from '../RequestsPage';
import { HomePageUser } from '../HomePageUser';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
                <Switch>
                    <PrivateRoute path="/users" component={HomePage} />
                    <PrivateRoute path="/inventory" component={InventoryPage} />
                    <PrivateRoute path="/requests" component={RequestsPage} />
                    <PrivateRoute path="/products" component={HomePageUser} />
                    <Route exact path="/" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export { App };