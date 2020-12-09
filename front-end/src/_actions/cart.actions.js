import { cartConstants } from '../_constants';
import { cartService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const cartActions = {
    addItem,
    removeItem,
    getAll,
    checkout
};

function addItem(item) {
    return dispatch => {
        dispatch(request(item));

        cartService.addItem(item)
            .then(
                item => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(item) { return { type: cartConstants.ADDITEM_REQUEST, item } }
    function success(item) { return { type: cartConstants.ADDITEM_SUCCESS, item } }
    function failure(error) { return { type: cartConstants.ADDITEM_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        cartService.getAll()
            .then(
                items => dispatch(success(items)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: cartConstants.GETALLITEMS_REQUEST } }
    function success(items) { return { type: cartConstants.GETALLITEMS_SUCCESS, items } }
    function failure(error) { return { type: cartConstants.GETALLITEMS_FAILURE, error } }
}

function removeItem(id) {
    return dispatch => {
        dispatch(request(id));

        cartService.removeItem(id)
            .then(
                item => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: cartConstants.DELETEITEM_REQUEST, id } }
    function success(id) { return { type: cartConstants.DELETEITEM_SUCCESS, id } }
    function failure(id, error) { return { type: cartConstants.DELETEITEM_FAILURE, id, error } }
}

function checkout(){
    return dispatch => {
        dispatch(request());

        cartService.checkout()
            .then(
                items => {
                    dispatch(success(items)),
                    history.push('/products')
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: cartConstants.CHECKOUT_REQUEST } }
    function success(items) { return { type: cartConstants.CHECKOUT_SUCCESS, items } }
    function failure(error) { return { type: cartConstants.CHECKOUT_FAILURE, error } }
}