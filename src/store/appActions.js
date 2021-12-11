export const getAllNeeds = () => {
    return (dispatch) => {
        dispatch({
            type: 'ALL_NEEDS',
            screenSize: window.innerWidth
        })
    }
};
export const showToastMeassage = (successMessage, errorMessage) => {
    return (dispatch) => {
        dispatch({
            type: 'TOAST_MESSAGE',
            successMessage: successMessage,
            errorMessage: errorMessage
        })
    }
};
