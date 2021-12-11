// import axios from 'axios'
// import config from '../../configs.json';
// import { logout } from '../../utils/auth';

// export const getUsers = (page, limit, serachValue = "") => {
//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })

//             const { data } = await axios.get(`${config["API"]}api/api/users?per_page=${limit}&page=${page}&name=${serachValue}`,
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`
//                     }
//                 }
//             );
//             dispatch({
//                 type: 'GET_USERS',
//                 payload: data.data,
//                 pageCount: data.meta.total,
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
// };

// export const deleteUsers = (id, closeModel, page, lastPage, changePage, searchVal = "") => {

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })

//             axios.delete(`${config["API"]}api/api/users/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => {
//                 axios.get(`${config["API"]}api/api/users?per_page=10&page=${changePage && lastPage === page ? page - 1 : page}&name=${searchVal}`,
//                     { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
//                 ).then(re => {
//                     dispatch({
//                         type: 'DELETE_USER',
//                         id: id,
//                         payload: re.data.data
//                     });

//                     closeModel(false);
//                 })
//             })
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
// };

// export const addUser = (body) => {

//     const position = body.position_id.split(' ');
//     const role = body.role_id.split(' ');

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })

//             const { data } = await axios.post(`${config["API"]}api/api/users`, {
//                 ...body, position_id: position[0], role_id: role[0]
//             }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//             dispatch({
//                 type: 'ADD_USER',
//                 payload: {
//                     ...body,
//                     id: data.id,
//                     role: { id: role[0], name: role[1] },
//                     position: { id: position[0], name: position[1] }
//                 }
//             });

//             dispatch({
//                 type: 'TOAST_MESSAGE',
//                 successMessage: `Add ${body.first_name} user`,
//                 errorMessage: null
//             });

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
//                     errorMessage: err.response.data.errors.email[0]
//                 })
//             }

//         }
//     }
// }


// export const editUser = (body, id) => {

//     const role = body.role_id.split(' ');
//     const position = body.position_id.split(' ');

//     return async (dispatch) => {
//         try {
//             dispatch({ type: 'PENDING', payload: true })

//             const { data } = await axios.put(`${config["API"]}api/api/users/${id}`, {
//                 first_name: body.first_name,
//                 last_name: body.last_name,
//                 username: body.username,
//                 email: body.email,
//                 email_confirmed: body.email_confirmed,
//                 phone_number: body.phone_number,
//                 phone_number_confirmed: body.phone_number_confirmed,
//                 is_active: body.is_active,
//                 is_removed: body.is_removed,
//                 role_id: role[0],
//                 position_id: position[0]
//             }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

//             dispatch({
//                 type: 'EDIT_USER',
//                 payload: {
//                     ...data,
//                 },
//                 id: id
//             });

//             dispatch({
//                 type: 'TOAST_MESSAGE',
//                 successMessage: `Edit ${body.first_name} user`,
//                 errorMessage: null
//             });

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

export const getUsers = (page, limit, serachValue = "") => {
    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })

            const { data } = await axios.get(`${config["API"]}api/api/users?per_page=${limit}&page=${page}&name=${serachValue}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            dispatch({
                type: 'GET_USERS',
                payload: data.data,
                pageCount: data.meta.total,
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
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'The given data was invalid.'
                })
            }


        }
    }
};

export const deleteUsers = (id, page, lastPage, changePage, searchVal = "") => {

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })

            axios.delete(`${config["API"]}api/api/users/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => {
                axios.get(`${config["API"]}api/api/users?per_page=10&page=${changePage && lastPage === page ? page - 1 : page}&name=${searchVal}`,
                    { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
                ).then(re => {
                    dispatch({
                        type: 'DELETE_USER',
                        id: id,
                        payload: re.data.data
                    });
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: 'seccessfuly deleted',
                        errorMessage: null
                    })
                })
            })
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
                else {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: 'Error'
                    })
                }
            }
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: 'Error'
                })
            }
        }
    }
};

export const addUser = (body) => {

    const position = body.position_id.split(' ');
    const role = body.role_id.split(' ');

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })

            const { data } = await axios.post(`${config["API"]}api/api/users`, {
                ...body, position_id: position[0], role_id: role[0]
            }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

            dispatch({
                type: 'ADD_USER',
                payload: {
                    ...body,
                    id: data.id,
                    role: { id: role[0], name: role[1] },
                    position: { id: position[0], name: position[1] }
                }
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: `Add ${body.first_name} user`,
                errorMessage: null
            });

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
                if (err.response.status === 422) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: '422'
                    })
                }
                if (err.response.status !== 422 && err.response.status !== 401) {
                    dispatch({
                        type: 'TOAST_MESSAGE',
                        successMessage: null,
                        errorMessage: '500'
                    })
                }

            }
            else {
                dispatch({
                    type: 'TOAST_MESSAGE',
                    successMessage: null,
                    errorMessage: err.response.data.errors.email[0]
                })
            }

        }
    }
}


export const editUser = (body, id) => {

    const role = body.role_id.split(' ');
    const position = body.position_id.split(' ');

    return async (dispatch) => {
        try {
            dispatch({ type: 'PENDING', payload: true })

            const { data } = await axios.put(`${config["API"]}api/api/users/${id}`, {
                first_name: body.first_name,
                last_name: body.last_name,
                username: body.username,
                email: body.email,
                email_confirmed: body.email_confirmed,
                phone_number: body.phone_number,
                phone_number_confirmed: body.phone_number_confirmed,
                is_active: body.is_active,
                is_removed: body.is_removed,
                role_id: role[0],
                position_id: position[0]
            }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem('token')}` } });

            dispatch({
                type: 'EDIT_USER',
                payload: {
                    ...data,
                },
                id: id
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: `Edit ${body.first_name} user`,
                errorMessage: null
            });

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