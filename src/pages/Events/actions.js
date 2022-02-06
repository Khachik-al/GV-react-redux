import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const getData = (body = { status: '', event_type: '', name: '' }) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`${config["API"]}api/api/customer-events/search`, body,
                { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });
            console.log(data);
            dispatch({
                type: 'GET_EVENTS',
                payload: Object.values(data).sort((a, b) => new Date(b.event_date) - new Date(a.event_date)),
                cloneData: true
            })
        }
        catch (err) {
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

export const getEvent = (id) => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true });
            const { data } = await axios.get(`${config["API"]}api/api/customer-events/${id}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );
            dispatch({
                type: 'GET_EVENT',
                payload: data
            })
            dispatch({ type: 'PENDING', payload: false })
        } catch (err) {
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
}


export const createEvent = (body, onClose, setPage) => {
    console.log(body);
    return async (dispatch) => {
        try {

            // dispatch({ type: 'PENDING', payload: true })

            const { data } = await axios.post(`${config["API"]}api/api/customer-events`, body, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch({
                type: 'CREATE_EVENT',
                payload: data
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Add event',
                errorMessage: null
            })

            onClose();
            setPage(1);

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
            dispatch({ type: 'PENDING_CREATE_EVENT', payload: false });
            // }
        }
    }
}


export const editEvent = (body, id, closeLoad) => {

    return async (dispatch) => {
        try {

            // dispatch({ type: 'PENDING', payload: true })

            await axios.put(`${config["API"]}api/api/customer-events/${id}`, body, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Edit event',
                errorMessage: null
            });
            closeLoad(false)
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
            closeLoad(false)
            // }
        }
    }
}

export const deleteEvent = (id, page, lastPage, changePage, searchVal = "", setPage) => {

    return async (dispatch) => {

        dispatch({ type: 'PENDING', payload: true });

        axios.delete(`${config["API"]}api/api/customer-events/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => {
            axios.get(`${config["API"]}api/api/customer-events?per_page=10&page=${changePage && lastPage === page ? page - 1 : page}&name=${searchVal}`,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            ).then(re => {

                dispatch({
                    type: 'DELETE_EVENT',
                    payload: Object.values(re.data).sort((a, b) => new Date(b.event_date) - new Date(a.event_date))
                });

                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: 'Success',
                    errorMessage: null
                });

                if (changePage) { setPage(page - 1) }
            })
        }).catch(err => {

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
        });
    };
};


export const createCustomer = (body, id, closeModal) => {
    return async (dispatch) => {
        try {
            await axios.put(`${config["API"]}api/api/customers/${id}`, body, {
                // const { data } = await axios.put(`${config["API"]}api/api/customers/${id}`, body, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Customer has been editted',
                errorMessage: null
            });
            closeModal(false);

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
}