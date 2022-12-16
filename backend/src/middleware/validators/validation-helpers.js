import validator from 'validator';

export function isUsernameValid(username) {
    return validator.isLength(username, { min: 1, max: 30 }) && validator.isAlphanumeric(username);
}

export function isPhoneValid(phone) {
    if (phone.charAt(0) == 0) {
        phone = phone.substring(1);
    }

    return validator.isMobilePhone(phone, ['ar-LB']);
}

export function isPasswordValid(password) {
    return (
        validator.isStrongPassword(password, {
            minLowercase: 1,
            minUppercase: 1,
            minSymbols: 0,
        }) && validator.isLength(password, { min: 8, max: 100 })
    );
}
