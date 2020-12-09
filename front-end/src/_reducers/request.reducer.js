import { requestConstants } from '../_constants';

export function requests(state = {}, action) {
    switch (action.type) {
        case requestConstants.GETALL_REQUEST:
            return {
                loading: true
            };

        case requestConstants.GETALL_SUCCESS:
            return {
                items: action.requests
            };

        case requestConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case requestConstants.ADDREQUEST_REQUEST:
            return {
                ...state,
                items :  { ...action, adding: true }
            };

        case requestConstants.ADDREQUEST_SUCCESS:
            return {
                items: {...state, action}
            };

        case requestConstants.ADDREQUEST_FAILURE:
            return {
                ...state,
                items: state.items.map(request => {
                    if (request.id !== action.id) {
                        const { adding, ...requestCopy } = request;
                        return { ...requestCopy, addError: action.error };
                    }
                    return request;
                })
            };

        case requestConstants.APPROVEREQUEST_REQUEST:
            return {
                ...state,
                items: state.items.map(request =>
                    request.id === action.id
                        ? { ...request, deleting: true }
                        : request
                )
            };

        case requestConstants.APPROVEREQUEST_SUCCESS:
            return {
                items: state.items.filter(request => request.id !== action.id)
            };

        case requestConstants.APPROVEREQUEST_FAILURE:
            return {
                ...state,
                items: state.items.map(request => {
                    if (request.id === action.id) {
                        const { deleting, ...requestCopy } = request;
                        return { ...requestCopy, deleteError: action.error };
                    }

                    return request;
                })
            };

        case requestConstants.REJECTREQUEST_REQUEST:
            return {
                ...state,
                items: state.items.map(request =>
                    request.id === action.id
                        ? { ...request, deleting: true }
                        : request
                )
            };

        case requestConstants.REJECTREQUEST_SUCCESS:
            return {
                items: state.items.filter(request => request.id !== action.id)
            };

        case requestConstants.REJECTREQUEST_FAILURE:
            return {
                ...state,
                items: state.items.map(request => {
                    if (request.id === action.id) {
                        const { deleting, ...requestCopy } = request;
                        return { ...requestCopy, deleteError: action.error };
                    }

                    return request;
                })
            };

        default:
            return state
    }
}