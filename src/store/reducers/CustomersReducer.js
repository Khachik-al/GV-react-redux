let defaultState = {
    customers: null,
    count: 10
};

export default function CustomersReducer(state = defaultState, action) {
    switch (action.type) {
        case "GET_CUSTOMERS": {
            return {
                ...state,
                customers: action.payload,
                // count: action.pageCount
            };
        }
        default: return state;
    }
};