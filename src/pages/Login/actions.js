import axios from 'axios'
import config from '../../configs.json';
import { saveInLocalStorage, logout } from '../../utils/auth';
import { history } from '../../utils/history';

export const login = (body) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true})
            const { data } = await axios.post(`${config["API"]}api/api/login`, body, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            saveInLocalStorage('token', data.token);
            saveInLocalStorage('user', data.user.role.id);
            saveInLocalStorage('position', data.user.position.id);
            saveInLocalStorage('userId', data.user.id);
            dispatch({ type: 'saveToken', token: data.token });
            history.push('/');

            dispatch({ type: 'PENDING', payload: false})

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

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: null,
                errorMessage: 'Log Out'
            })
        };
    };
};


export const forgotPassw = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true})
            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Success',
                errorMessage: null
            })
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
        };
    };
};