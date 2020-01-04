import axios from '../apis/axios';
import { LOGIN, REGISTER, GET_SERVICES, LOGOUT, POST_ORDER, GET_ORDERS, PATCH_USER } from "./types";
import history from '../history';

// export const login = formValues => async dispatch => {
//     const response = await axios.post(`/users/login`, formValues);
//     dispatch({ type: LOGIN, payload: response.data });
//     history.push('/');
// };

export const login = ({ login, password }) => async dispatch => {
    const response = await axios.get(`/users?login=${login}&password=${password}`);
    dispatch({ type: LOGIN, payload: response.data });
    history.push('/services');
}

export const logout = () => {
    return {
        type: LOGOUT
    };
};

export const updateUser = (id, balance) => async dispatch => {
    const response = await axios.patch(`/users/${id}`, { ...balance, balance });
    dispatch({ type: PATCH_USER, payload: response.data });
};

export const getOrders = userId => async dispatch => {
    const response = await axios.get(`/orders?userId=${userId}`);
    dispatch({ type: GET_ORDERS, payload: response.data });
};

export const postOrder = (totalPrice, selectedServices, balance) => async (dispatch, getState) => {
    const { id } = getState().auth.user[0];
    const response = await axios.post('/orders', { userId: id, totalPrice, selectedServices });
    dispatch({ type: POST_ORDER, payload: response.data });
    dispatch(updateUser(id, balance));
    history.push('/orders');
};

export const register = formValues => async dispatch => {
    const response = await axios.post('/users', formValues);
    dispatch({ type: REGISTER, payload: response.data });
    history.push('/');
}

export const getServices = () => async dispatch => {
    const response = await axios.get('/services');
    dispatch({ type: GET_SERVICES, payload: response.data });
};