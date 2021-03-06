import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const getUsers = (page, limit, serachValue = "") => {
    console.log(serachValue)
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.get(`${config["API"]}api/api/customers?per_page=${limit}&page=${page}&name=${serachValue}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            console.log(data)

            dispatch({
                type: 'GET_CUSTOMERS',
                payload: Object.values(data),
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
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'Error'
                })
            }
        }
    }
};


export const deleteUsers = (id) => {

    return async (dispatch) => {
        try {
            await axios.delete(`${config["API"]}api/api/customers/${id}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
                .then(res => {
                    axios.get(`${config["API"]}api/api/customers`,
                        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
                    ).then(re => {
                        dispatch({
                            type: 'GET_CUSTOMERS',
                            payload: Object.values(re.data),
                        });
                        dispatch({
                            type: 'TOAST_MESSAGE',
                            successMessage: 'seccessfuly deleted',
                            errorMessage: null
                        })
                    })
                })
        } catch (err) {
            console.log(err.response)
            if (err.response && err.response.hasOwnProperty('status')) {
                if (err.response.status === 401 && localStorage.getItem('token')) {
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
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'Error'
                })
            }
        }
    }
};