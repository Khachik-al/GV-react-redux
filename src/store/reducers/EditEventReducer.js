let defaultState = {
    data: null
};

export default function EditEventReducer(state = defaultState, action) {
    switch (action.type) {
        case "GET_EVENT": {
            return {
                ...state,
                data: action.payload,
            };
        }
        default: return state;
    }
}