import axios from 'axios'
import config from '../../../configs.json';
import { logout } from '../../../utils/auth';

export const getVendors = (page, limit, serachValue = "") => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            // const { data } = await axios.get(`${config["API"]}api/api/vendors?per_page=${limit}&page=${page}&name=${serachValue}`,
            const { data } = await axios.get(`${config["API"]}api/api/vendors`,
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                }
            );
            console.log(data);
            dispatch({
                type: 'GET_VENDORS', payload: Object.values(data),
            });
            dispatch({ type: 'PENDING', payload: false })

        } catch (err) {
            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE', errorMessage: 'Log Out'
                    })
                }
                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
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
export const getVendor = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            // const { data } = await axios.get(`${config["API"]}api/api/vendors?per_page=${limit}&page=${page}&name=${serachValue}`,
            const { data } = await axios.get(`${config["API"]}api/api/vendors/${id}`,
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                }
            );
            console.log(data);
            dispatch({
                type: 'GET_VENDOR', payload: data,
            });
            dispatch({ type: 'PENDING', payload: false })

        } catch (err) {
            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE', errorMessage: 'Log Out'
                    })
                }
                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
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


export const createAndEditVendors = (body, id, meth) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios[meth](`${config["API"]}api/api/vendors/${id}`,
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                },
                body
            );
            console.log(data);
            dispatch({
                type: 'CREATE_EDIT_VENDORS'
            });
            dispatch({ type: 'PENDING', payload: false })

        } catch (err) {
            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE', errorMessage: 'Log Out'
                    })
                }
                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
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

export const deleteVendors = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.delete(`${config["API"]}api/api/vendors/${id}`,
                {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                }
            );
            console.log(data);
            dispatch({
                type: 'DELETE_VENDORS'
            });
            dispatch({ type: 'PENDING', payload: false })

        } catch (err) {
            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401) {
                    logout();
                    dispatch({ type: 'saveToken', token: '' });
                    dispatch({
                        type: 'TOAST_MESSAGE', errorMessage: 'Log Out'
                    })
                }
                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
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
