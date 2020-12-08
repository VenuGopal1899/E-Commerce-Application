import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    addProduct,
    deleteProduct: _delete,
    getAll
};

function addProduct(product) {
    return dispatch => {
        dispatch(request(product));

        productService.addProduct(product)
            .then(
                product => {
                    dispatch(success());
                    history.push('/products');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(product) { return { type: productConstants.ADDPRODUCT_REQUEST, product } }
    function success(product) { return { type: productConstants.ADDPRODUCT_SUCCESS, product } }
    function failure(error) { return { type: productConstants.ADDPRODUCT_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        productService.deleteProduct(id)
            .then(
                product => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.DELETEPRODUCT_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETEPRODUCT_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETEPRODUCT_FAILURE, id, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}