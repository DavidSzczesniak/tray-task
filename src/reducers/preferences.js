/**
 * Stores privacy preferences selected by the user
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
