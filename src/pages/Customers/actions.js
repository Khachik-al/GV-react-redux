import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const getUsers = (page, limit, serachValue = "") => {
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

            dispatch({
                type: 'GET_CUSTOMERS',
                payload: data,
            });
            dispatch({ type: 'PENDING', payload: false })

        } catch(err) {
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