import { cartConstants } from '../_constants';

export function cart(state = {}, action) {
    switch (action.type) {
        case cartConstants.GETALLITEMS_REQUEST:
            return {
                loading: true
            };

        case cartConstants.GETALLITEMS_SUCCESS:
            return {
                items: action.items
            };

        case cartConstants.GETALLITEMS_FAILURE:
            return {
                error: action.error
            };

        case cartConstants.ADDITEM_REQUEST:
            return {
                ...state,
                items :  { ...action, adding: true }
            };

        case cartConstants.ADDITEM_SUCCESS:
            return {
                items: {...state, action}
            };

        case cartConstants.ADDITEM_FAILURE:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id !== action.id) {
                        const { adding, ...itemCopy } = item;
                        // return copy of user with 'deleteError:[error]' property
                        return { ...itemCopy, addError: action.error };
                    }
                    return item;
                })
            };

        case cartConstants.DELETEITEM_REQUEST:
            return {
                ...state,
                items: state.items.map(item => item.id === action.id ? { ...item, deleting: true } : item)
            };

        case cartConstants.DELETEITEM_SUCCESS:
            return {
                items: state.items.filter(item => item.id !== action.id)
            };

        case cartConstants.DELETEITEM_FAILURE:
            return {
                ...state,
                items: state.items.map(i => {
                    if (i.id === action.id) {
                        const { deleting, ...itemCopy } = i;
                        return { ...itemCopy, deleteError: action.error };
                    }

                    return i;
                })
            };

        default:
            return state
    }
}