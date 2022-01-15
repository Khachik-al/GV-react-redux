let defaultState = {
    eventContracts: null,
    eventContractsCount: 10
};

export default function EventContractReducer(state = defaultState, action) {
    switch (action.type) {
        case "GET_EVENT_CONTRACTS": {
            return {
                ...state,
                eventContracts: action.payload,
                eventContractsCount: action.payload.length
            };
        }
        default: return state;
    }
};