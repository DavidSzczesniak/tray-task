import errorsReducer from './formErrors';
import valuesReducer from './formValues';
import preferencesReducer from './preferences';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    errors: errorsReducer,
    formValues: valuesReducer,
    preferences: preferencesReducer,
});

export default rootReducer;
