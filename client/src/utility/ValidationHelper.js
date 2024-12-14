
export const isEmpty = (value) => {
    return value === null || value === undefined || value.length === 0;
}

export const isDesEmpty = (value) => {
    return value.length < 400
}

export const IsEmail = (value) => {
    let EmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!value) return "Email cannot be empty.";
    if (!EmailRegex.test(value)) return "Please enter a valid email address.";

    return "Valid email"
}

export const ValidPassword = (password) => {
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must include at least one lowercase letter.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must include at least one uppercase letter.";
    }
    if (!/\d/.test(password)) {
        return "Password must include at least one number.";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "Password must include at least one special character (@, $, !, %, *, ?, &).";
    }
    if (!PasswordRegex.test(password)) {
        return "Password does not meet the required criteria.";
    }

    return "Password is valid.";
};
