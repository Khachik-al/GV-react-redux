// import axios from 'axios'
// import config from '../../configs.json';
// import { logout } from '../../utils/auth';

// export const getMenu = () => {

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })
//             const { data } = await axios.get(`${config["API"]}api/api/event-menus`,
//                 { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//             dispatch({
//                 type: 'GET_MENU',
//                 payload: data
//             });
//             dispatch({ type: 'PENDING', payload: false })

//         } catch (err) {
//             if (err.response.hasOwnProperty('status')) {
//                 if (err.response.status === 401) {
//                     logout();
//                     dispatch({ type: 'saveToken', token: '' });
//                     dispatch({
//                         type: 'TOAST_MESSAGE',
//                         successMessage: null,
//                         errorMessage: 'Your profile was deleted'
//                     })
//                 }
//             }
//             else {
//                 dispatch({
//                     type: 'TOAST_MESSAGE',
//                     successMessage: null,
//                     errorMessage: 'The given data was invalid.'
//                 })
//             }
//         }
//     }
// }



// export const createMenu = (body, onClose) => {

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })
//             const { data } = await axios.post(`${config["API"]}api/api/event-menus`, body,
//                 { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//             dispatch({
//                 type: 'CREATE_MENU',
//                 payload: data
//             });

//             dispatch({
//                 type: 'TOAST_MESSAGE',
//                 successMessage: 'Success',
//                 errorMessage: null
//             });

//             onClose();

//         } catch (err) {
//             if (err.response.hasOwnProperty('status')) {
//                 if (err.response.status === 401) {
//                     logout();
//                     dispatch({ type: 'saveToken', token: '' });
//                     dispatch({
//                         type: 'TOAST_MESSAGE',
//                         successMessage: null,
//                         errorMessage: 'Your profile was deleted'
//                     })
//                 }
//             }
//             else {
//                 dispatch({
//                     type: 'TOAST_MESSAGE',
//                     successMessage: null,
//                     errorMessage: 'The given data was invalid.'
//                 })
//             }
//         }
//     }
// }



// export const editMenu = (body, id, onClose) => {

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })
//             const { data } = await axios.put(`${config["API"]}api/api/event-menus/${id}`, body,
//                 { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//             dispatch({
//                 type: 'EDIT_MENU',
//                 payload: data
//             });

//             dispatch({
//                 type: 'TOAST_MESSAGE',
//                 successMessage: 'Success',
//                 errorMessage: null
//             });

//             onClose();

//         } catch (err) {
//             if (err.response.hasOwnProperty('status')) {
//                 if (err.response.status === 401) {
//                     logout();
//                     dispatch({ type: 'saveToken', token: '' });
//                     dispatch({
//                         type: 'TOAST_MESSAGE',
//                         successMessage: null,
//                         errorMessage: 'Your profile was deleted'
//                     })
//                 }
//             }
//             else {
//                 dispatch({
//                     type: 'TOAST_MESSAGE',
//                     successMessage: null,
//                     errorMessage: 'The given data was invalid.'
//                 })
//             }
//         }
//     }
// }


// export const deleteMenuF = (id, onClose, length, setPage, page) => {

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })
//             const { data } = await axios.delete(`${config["API"]}api/api/event-menus/${id}`,
//                 { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//             dispatch({
//                 type: 'DELETE_MENU',
//                 id: id
//             });

//             dispatch({
//                 type: 'TOAST_MESSAGE',
//                 successMessage: 'Success',
//                 errorMessage: null
//             });

//             if (length === 1) { setPage(page - 1) }
//             onClose(false);

//         } catch (err) {
//             if (err.response.hasOwnProperty('status')) {
//                 if (err.response.status === 401) {
//                     logout();
//                     dispatch({ type: 'saveToken', token: '' });
//                     dispatch({
//                         type: 'TOAST_MESSAGE',
//                         successMessage: null,
//                         errorMessage: 'Your profile was deleted'
//                     })
//                 }
//             }
//             else {
//                 dispatch({
//                     type: 'TOAST_MESSAGE',
//                     successMessage: null,
//                     errorMessage: 'The given data was invalid.'
//                 })
//             }
//         }
//     }
// }


import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const getMenu = () => {

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.get(`${config["API"]}api/api/event-menus`,
                { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

            dispatch({
                type: 'GET_MENU',
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
                        errorMessage: 'Log Out'
                    })
                }
            }
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'The given data was invalid.'
                })
            }
        }
    }
}



export const createMenu = (body, onClose) => {

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.post(`${config["API"]}api/api/event-menus`, body,
                { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

            dispatch({
                type: 'CREATE_MENU',
                payload: data
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Success',
                errorMessage: null
            });

            onClose();

        } catch (err) {
            if (err.response.hasOwnProperty('status')) {
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

                if (err.response.status !== 422 && err.response.status !== 401) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: 'Internal server error'
                    })
                }

            }
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'The given data was invalid.'
                })
            }
        }
    }
}



export const editMenu = (body, id, onClose) => {

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.put(`${config["API"]}api/api/event-menus/${id}`, body,
                { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

            dispatch({
                type: 'EDIT_MENU',
                payload: data
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Success',
                errorMessage: null
            });

            onClose();

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
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'The given data was invalid.'
                })
            }
        }
    }
}


export const deleteMenuF = (id, length, setPage, page) => {

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })
            const { data } = await axios.delete(`${config["API"]}api/api/event-menus/${id}`,
                { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

                console.log(data);

            dispatch({
                type: 'DELETE_MENU',
                id: id
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: 'Success',
                errorMessage: null
            });

            if (length === 1) { setPage(page - 1) }

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
                else{
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: 'Internal server error'
                    })
                }
            }
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'Internal server error'
                })
            }
        }
    }
}