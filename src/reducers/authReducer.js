import { LOGIN, LOGOUT, REGISTER, PATCH_USER } from "../actions/types";

const INITIAL_STATE = {
    isLoggedIn: false,
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return { ...state, isLoggedIn: true, user: action.payload };
        case LOGOUT:
            return { ...state, isLoggedIn: false, user: null };
        case REGISTER: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case PATCH_USER: {
            return { ...state, [action.payload.id]: action.payload };
        }
        default:
            return state;
    }
};