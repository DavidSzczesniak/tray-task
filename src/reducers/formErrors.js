/**
 * Stores errors from form validation
 * @param {Object} state - state to modify
 * @param {string} action - action to carry out
 * @returns state
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
