import axios from 'axios'
import config from '../../../configs.json';
import { logout } from '../../../utils/auth';

export const getEventContracts = (page, limit, serachValue = "") => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            // const { data } = await axios.get(`${config["API"]}api/api/event-contacts?per_page=${limit}&page=${page}&name=${serachValue}`,
            const { data } = await axios.get(`${config["API"]}api/api/event-contacts`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(data);
            dispatch({
                type: 'GET_EVENT_CONTRACTS', payload: Object.values(data),
            });
            dispatch({ type: 'PENDING', payload: false })

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
            } else {
                dispatch({
                    type: 'TOAST_MESSAGE', errorMessage: 'Error'
                })
            }

        }
    }
};
export const createEventContract = (body) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.get(`${config["API"]}api/api/event-contacts`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }, body
            );
            console.log(data);
            dispatch({
                type: 'CREATE_EVENT_CONTRACTS', payload: Object.values(data),
            });
            dispatch({ type: 'PENDING', payload: false })

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
            } else {
                dispatch({
                    type: 'TOAST_MESSAGE', errorMessage: 'Error'
                })
            }
        }
    }
};
