import { requestConstants } from '../_constants';
import { requestService } from '../_services';
import { alertActions } from './alert.actions';

export const requestActions = {
    addRequest,
    approveRequest,
    rejectRequest,
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

function approveRequest(id) {
    return dispatch => {
        dispatch(request(id));

        requestService.approveRequest(id)
        .then(
            request => dispatch(success(id)),
            error => dispatch(failure(id, error.toString()))
        );
    }

    function request(id) { return { type: requestConstants.APPROVEREQUEST_REQUEST, id } }
    function success(id) { return { type: requestConstants.APPROVEREQUEST_SUCCESS, id } }
    function failure(error) { return { type: requestConstants.APPROVEREQUEST_FAILURE, id, error } }
}

function rejectRequest(id) {
    return dispatch => {
        dispatch(request(id));

        requestService.rejectRequest(id)
        .then(
            request => dispatch(success(id)),
            error => dispatch(failure(id, error.toString()))
        );
    }

    function request(id) { return { type: requestConstants.REJECTREQUEST_REQUEST, id } }
    function success(id) { return { type: requestConstants.REJECTREQUEST_SUCCESS, id } }
    function failure(error) { return { type: requestConstants.REJECTREQUEST_FAILURE, id, error } }
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
