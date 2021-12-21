import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const editAccount = (body, id) => {

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
                type: 'EDIT_ACCOUNT',
                payload: {
                    ...data,
                    id: id
                }
            });

            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: `${body.first_name} user has been editted`,
                errorMessage: null
            });

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
        }
    }
}