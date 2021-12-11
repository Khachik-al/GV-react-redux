let defaultState = {
    data: null,
    cloneData: null,
    count: 0,
    pending_create: false,
    pending_create_customer: false
};

export default function EventsReducer(state = defaultState, action) {
    switch (action.type) {

        case "PENDING_CREATE_EVENT": {
            return {
                ...state,
                pending_create: action.payload
            };
        }

        case "PENDING_CREATE_CUSTOMER": {
            return {
                ...state,
                pending_create_customer: action.payload
            };
        }

        case "GET_EVENTS": {
            return {
                ...state,
                data: action.payload,
                count: Object.values(action.payload).length,
                cloneData: action.cloneData ? [...action.payload] : state.cloneData
            };
        }

        case "CREATE_EVENT": {
            return {
                data: [action.payload, ...state.data ],
                count: state.count + 1,
                pending_create: false
            };
        }

        case "DELETE_EVENT": {
            return {
                data: action.payload,
                count: state.count - 1,
            };
        }

        default: return state;
    }
}