import axios from 'axios'
import config from '../../configs.json';
import { logout } from '../../utils/auth';

export const getCalendarData = (month, year) => {

    console.log(month);
    console.log(year);

    return async (dispatch) => {
        try {

            let body = {month: month, year: year}

            const { data } = await axios.post(`${config["API"]}api/api/google-calendar/search`, body,
                { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
            );

            console.log(data);

            dispatch({
                type: 'GET_CALENDAR_DATA',
                payload: data.map(el => {
                    
                    // let startDate = el.googleEvent.start.dateTime ? new Date(el.googleEvent.start.dateTime) : new Date(el.googleEvent.start.date);
                    let endDate = el.googleEvent.end.dateTime ? new Date(el.googleEvent.end.dateTime) : new Date(el.googleEvent.end.date);

                    return {
                        start: endDate,
                        end: endDate,
                        title: el.googleEvent.summary,
                        creator: el.googleEvent.creator.email,
                        allDay: el.googleEvent.creator.email === 'grandvenue@grandvenue-333715.iam.gserviceaccount.com' ? false : true
                    }
                })
            })

        }
        catch (err) {

            console.log(err);

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
            dispatch({
                type: 'TOAST_MESSAGE',
                successMessage: null,
                errorMessage: 'Error'
            })

        }
    }
};