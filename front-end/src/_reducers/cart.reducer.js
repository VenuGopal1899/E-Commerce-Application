import { cartConstants } from '../_constants';

export function cart(state = {}, action) {
    switch (action.type) {
        case cartConstants.GETALLITEMS_REQUEST:
            console.log(state, 'state.items');
            return {
                loading: true,
                items: state.items
            };

        case cartConstants.GETALLITEMS_SUCCESS:
            return {
                items: state.items
            };

        case cartConstants.GETALLITEMS_FAILURE:
            return {
                error: action.error
            };

        case cartConstants.ADDITEM_REQUEST:
            console.log(state, 'state');
            return {
                ...state,
                items :  action.item
            };

        case cartConstants.ADDITEM_SUCCESS:
            return {
                items: state.items
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
                items: state.items.map(item => (item.id === action.username.id && item.userName === action.username.username) ? { ...item, deleting: true } : item)
            };

        case cartConstants.DELETEITEM_SUCCESS:
            const newItemsList = [];
            for(var i=0; i<state.items.length; i++){
                if(state.items[i].userName === action.items.username && state.items[i].productID === action.items.id){
                    continue;
                } else {
                    newItemsList.push(state.items[i]);
                }
            }
            return {
                items: newItemsList
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