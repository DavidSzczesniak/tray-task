import React from 'react';
import { useHistory } from 'react-router';
import useForm from '../../helpers/useForm';
import validate from '../../helpers/validateInputs';
import FormField from '../FormField/FormField';
import './User.css';

const User = () => {
    const history = useHistory();
    const { values, handleChange, handleSubmit } = useForm(validate, formSuccess);

    function formSuccess() {
        history.replace('/privacy');
    }

    return (
        <>
            {/* noValidate - suppress default form validation messages */}
            <form onSubmit={handleSubmit} noValidate>
                <FormField label="Name" required values={values} handleChange={handleChange} />
                <FormField label="Role" values={values} handleChange={handleChange} />
                <FormField label="Email" required values={values} handleChange={handleChange} />
                <FormField
                    label="Password"
                    required
                    type="password"
                    values={values}
                    handleChange={handleChange}
                />
                <div className="btn-container">
                    <button type="submit">Next</button>
                </div>
            </form>
        </>
    );
};

export default User;
