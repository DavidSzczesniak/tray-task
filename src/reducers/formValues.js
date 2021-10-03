const valuesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_FORM_VALUES':
            return action.payload;
        default:
            return state;
    }
};

export default valuesReducer;
