let defaultState = {
    users: null,
    count: 0,

};

export default function StaffReducer(state = defaultState, action) {
    switch (action.type) {

        case "GET_USERS": {
            return {
                ...state,
                users: action.payload,
                count: action.pageCount,
            };
        }
        case "DELETE_USER": {
            return {
                ...state,
                users: [...action.payload],
                count: state.count - 1,
            };
        }
        case "ADD_USER": {
            const newUsers = [action.payload, ...state.users];
            newUsers.splice(10, 1);
            return {
                ...state,
                users: newUsers,
                count: state.count + 1,
            };
        }

        case "EDIT_USER": {
            let editUser = state.users.findIndex(el => el.id === action.id);
            let newUsers = [...state.users];
            newUsers[editUser] = { ...action.payload };
            return {
                ...state,
                users: newUsers,
            };
        }
        default: return state;
    }
};