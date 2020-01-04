import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import servicesReducer from './servicesReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    services: servicesReducer,
    orders: ordersReducer
});