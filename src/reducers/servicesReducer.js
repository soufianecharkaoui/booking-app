import _ from 'lodash';
import { GET_SERVICES } from "../actions/types";

export default (state = {}, action) => {
    switch (action.type) {
        case GET_SERVICES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}