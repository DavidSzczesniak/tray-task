import { useState, useEffect } from 'react';
import { updateErrors, updateFormValues } from '../actions';
import { useDispatch } from 'react-redux';

const useForm = (validate, formSuccess) => {
    const [values, setValues] = useState({
        name: '',
        role: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validateOutput = validate(values);
        setErrors(validateOutput);
        dispatch(updateErrors(validateOutput));

        setSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            formSuccess();
            dispatch(updateFormValues(values));
        }
    }, [dispatch, errors, formSuccess, isSubmitting, values]);

    return { handleChange, values, handleSubmit };
};

export default useForm;
