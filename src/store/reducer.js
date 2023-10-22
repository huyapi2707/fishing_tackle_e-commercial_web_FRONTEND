import { SET_LOGIN_STATUS, SET_WAITING_STATUS, SET_CURRENT_PAGE, ADD_NEW_CART_ITEM, SET_NOTIFY } from './constants';
const initState = {
    notify: {
        display: 'none',
        type: '',
        content: '',
    },
    login: {
        cart: [],
        user: null,
        status: false,
    },
    waiting: 'none',
    page: {
        type: 'product',
        title: 'sản phẩm nổi bật',
        dataUrl: {
            pageAmount: '/api/v1/product/page_amount',
            data: '/api/v1/product/get_page?page=',
        },
    },
};

function reducer(state, action) {
    switch (action.type) {
        case SET_LOGIN_STATUS:
            return {
                ...state,
                login: action.payload,
            };
        case SET_WAITING_STATUS:
            return {
                ...state,
                waiting: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        case SET_NOTIFY: {
            return {
                ...state,
                notify: action.payload,
            };
        }
        case ADD_NEW_CART_ITEM: {
            state['login']['cart'] = action.payload;
            return {
                ...state,
            };
        }
        default:
            throw new Error('Invalid action');
    }
}

export default reducer;
export { initState };
