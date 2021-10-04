/**
 * Stores errors from form validation
 */
const errorsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_ERRORS':
            return action.payload;
        default:
            return state;
    }
};

export default errorsReducer;
