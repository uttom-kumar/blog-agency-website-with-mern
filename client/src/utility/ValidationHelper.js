export const isEmpty = (value) => {
    return value === null || value === undefined || value.length === 0;
}

export const isDesEmpty = (value) => {
    return value.length < 400
}

export const IsEmail = (value) => {
    let EmailRegex = /\S+@\S+\.\S+/
    return EmailRegex.test(value)
}