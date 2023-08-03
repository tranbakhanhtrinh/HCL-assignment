export const checkValidity = (value, rules) => {
    let isValid = true;
    let message = "";
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== "" && isValid;
        isValid ? message = "" : message = "This field can not be empty";
    }
    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
        isValid ? message = "" : message = "This field contains number only";
    }
    return {isValid, message};
};
