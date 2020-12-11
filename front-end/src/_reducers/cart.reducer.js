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
                items: state.items.filter(item => item.productID !== action.id)
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

        case cartConstants.CHECKOUT_REQUEST:
            return {
                items: state.items
            }

        case cartConstants.CHECKOUT_SUCCESS:
            return {
                items: {}
            }

        case cartConstants.CHECKOUT_FAILURE:
            return {
                items: state.items
            }

        default:
            return state
    }
}