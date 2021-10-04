/**
 * Stores privacy preferences selected by the user
 * @param {Object} state - state to modify
 * @param {string} action - action to carry out
 * @returns state
 */
const preferencesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PREF':
            return action.payload;
        default:
            return state;
    }
};

export default preferencesReducer;
