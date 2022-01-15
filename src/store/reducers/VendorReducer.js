let defaultState = {
    vendors: null,
    vendor: null,
    vendorsCount: 0
};

export default function VendorReducer(state = defaultState, action) {
    switch (action.type) {
        case "GET_VENDORS": {
            return {
                ...state,
                vendors: action.payload,
                vendorsCount: action.payload.length
            };
        }
        case "GET_VENDOR": {
            return {
                ...state,
                vendor: action.payload,
            };
        }
        default: return state;
    }
};