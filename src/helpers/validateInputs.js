/**
 * Validate input values passed in against the conditions set below
 * @param {Object} values - input values to be validated
 * @returns {Object} errors for each invalid input value
 */
export default function validateInputs(values) {
    let errors = {};
    const { name, email, password } = values;

    if (!name.trim()) {
        errors.name = 'Name is required';
    }

    // one or more characters (S+) before and after @ symbol
    // followed by a full stop (.)
    // followed by one or more characters
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Email address is invalid';
    }

    // (?=.*[a-z]) = at least one lowercase letter
    // (?=.*[A-Z]) = at least one uppercase letter
    // (?=.*[0-9]) = at least one number
    // (?=.{10,}) = must be 10 characters or longer
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{10,})/;
    if (!password) {
        errors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
        errors.password =
            'Password needs to be more than 9 characters long, include at least one number, one uppercase and one lowercase letter';
    }

    return errors;
}
