import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const getUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.get(`${config["API"]}api/api/users/${id}`,
                { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch({
                type: 'GET_USER',
                payload: data
            });
            dispatch({ type: 'PENDING', payload: false })
        } catch (err) {
            if (err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: 'Your profile was deleted'
                    })
                }
            }
        }
    }
};

export const resetUser = () => {
    return (dispatch) => {
        dispatch({ type: 'PENDING', payload: true })
        dispatch({
            type: 'RESET_USER',
        });
        dispatch({ type: 'PENDING', payload: false })
    }
};