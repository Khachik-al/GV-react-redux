let defaultState = {
    menues: null,
    count: 0
};

export default function SettingsReducer(state = defaultState, action) {
    switch (action.type) {
        case "GET_MENU": {
            return {
                ...state,
                menues: action.payload,
                count: Object.values(action.payload).length
            };
        }

        case "CREATE_MENU": {
            return {
                ...state,
                menues: { ...state.menues, [action.payload.id]: action.payload },
                count: state.count + 1
            };
        }

        case "EDIT_MENU": {
            let cloneMenu = { ...state.menues };
            cloneMenu[action.payload.id] = action.payload;
            return {
                ...state,
                menues: cloneMenu
            };
        }

        case "DELETE_MENU": {
            let cloneMenu = { ...state.menues };
            delete cloneMenu[action.id.toString()];
            return {
                ...state,
                menues: cloneMenu,
                count: state.count - 1
            };
        }

        default: return state;
    }
}