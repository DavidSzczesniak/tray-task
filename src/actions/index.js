export const updateErrors = (newValues) => {
    return {
        type: 'UPDATE_ERRORS',
        payload: newValues,
    };
};

export const updateFormValues = (newValues) => {
    return {
        type: 'UPDATE_FORM_VALUES',
        payload: newValues,
    };
};

export const updatePreferences = (newValues) => {
    return {
        type: 'UPDATE_PREF',
        payload: newValues,
    };
};
