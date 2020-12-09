import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { cart } from './cart.reducer';
import { alert } from './alert.reducer';
import { requests } from './request.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    requests,
    cart,
    alert
});

export default rootReducer;