/**
 * Stores form values passed by the user
 * @param {Object} state - state to modify
 * @param {string} action - action to carry out
 * @returns state
 */
const valuesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_FORM_VALUES':
            return action.payload;
        default:
            return state;
    }
};

export default valuesReducer;
