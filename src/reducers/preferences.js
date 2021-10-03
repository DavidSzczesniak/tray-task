const preferencesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_PREF':
            return action.payload;
        default:
            return state;
    }
};

export default preferencesReducer;
