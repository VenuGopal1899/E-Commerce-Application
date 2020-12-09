import { requestConstants } from '../_constants';
import { requestService } from '../_services';
import { alertActions } from './alert.actions';

export const requestActions = {
    addRequest,
    getAll
};

function addRequest(r){
    return dispatch => {
        dispatch(request(r));

        requestService.addRequest(r)
            .then(
                request => {
                    dispatch(success());
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    }

    function request(r) { return { type: requestConstants.ADDREQUEST_REQUEST, r } }
    function success(r) { return { type: requestConstants.ADDREQUEST_SUCCESS, r } }
    function failure(error) { return { type: requestConstants.ADDREQUEST_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        requestService.getAll()
            .then(
                requests => dispatch(success(requests)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: requestConstants.GETALL_REQUEST } }
    function success(requests) { return { type: requestConstants.GETALL_SUCCESS, requests } }
    function failure(error) { return { type: requestConstants.GETALL_FAILURE, error } }
}
