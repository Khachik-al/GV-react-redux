let defaultState = {
    data: null,
};

export default function CalendarReducer(state = defaultState, action) {
    switch (action.type) {

        case "GET_CALENDAR_DATA": {
            return {
                ...state,
                data: action.payload
            };
        }

        default: return state;
    }
}