import _ from 'lodash';
import { POST_ORDER, GET_ORDERS } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case POST_ORDER: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case GET_ORDERS: {
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        }
        default:
            return state;
    }
}