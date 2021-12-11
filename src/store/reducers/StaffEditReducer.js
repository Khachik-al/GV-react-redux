let defaultState = {
    staffUser: null,
};

export default function StaffEditReducer(state = defaultState, action) {
    switch (action.type) {
        case 'GET_USER': {
            return {
                staffUser: action.payload
            };
        }

        case 'EDIT_ACCOUNT': {
            return {
                staffUser: action.payload
            };
        }

        case 'RESET_USER': {
            return {
                staffUser: null
            }
        }
        default: return state;
    }
}