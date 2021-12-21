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

            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: 'Log Out'
                    })
                }

                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
                    })
                }
            }

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: null,
                errorMessage: 'Error'
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
            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: 'Log Out'
                    })
                }

                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
                    })
                }
            }

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: null,
                errorMessage: 'Error'
            })
        };
    };
};