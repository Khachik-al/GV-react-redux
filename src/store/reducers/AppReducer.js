import { checkLoginStatus, getFromLocal } from '../../utils/auth';

let defaultState = {
    isAuthenticated: checkLoginStatus(),
    userType: null,
    position: null,
    userId: null,
    screenSize: 0,
    successMessage: null,
    errorMessage: null,
    pending: false
};

export default function AppReducer(state = defaultState, action) {
    switch (action.type) {

        case "PENDING": {
            return {
                ...state,
                pending: action.payload
            };
        }

        case "saveToken": {
            return {
                ...state,
                isAuthenticated: checkLoginStatus(),
                userType: getFromLocal('user'),
                position: getFromLocal('position'),
                userId: getFromLocal('userId')
            };
        }

        case "ALL_NEEDS": {
            return {
                ...state,
                screenSize: action.screenSize,
                isAuthenticated: checkLoginStatus(),
                userType: getFromLocal('user'),
                position: getFromLocal('position'),
                userId: getFromLocal('userId')
            };
        }
        case "TOAST_MESSAGE": {
            return {
                ...state,
                successMessage: action.successMessage,
                errorMessage: action.errorMessage,
                pending: false
            };
        }

        default: return state;
    }
}