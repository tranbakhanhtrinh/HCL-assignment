import { useEffect, useMemo, useState } from "react";
import { formConfig } from "../constants/formConfig";
import { checkValidity } from "../helpers/checkValidity";

const useValidate = ({ initialValues, onSubmit }) => {
    const [values, setValues] = useState(initialValues);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});
    const setFieldValue = (_field, _value) => {
        setValues((pre) => ({ ...pre, [_field]: _value }));
    };

    const setFieldTouched = (_field, _value) => {
        setTouched((pre) => ({ ...pre, [_field]: _value }));
    };

    const setFieldError = (_field, _value) => {
        setErrors((pre) => ({ ...pre, [_field]: _value }));
    };
    const iEr = Object.keys(initialValues).reduce((acc, key) => (acc[key] = "", acc ),{})

    useEffect(() => {
        setValues(initialValues);
        setErrors(iEr)
    }, [initialValues]);

    const handleOnChange = (e) => {
        const { name, value } = e;
        setFieldTouched(name, true);
        const fieldName = formConfig.find((f) => f.name === name);
        const { isValid, message } = checkValidity(value, fieldName.validation);
        if (!isValid) {
            setFieldError(name, message);
        } else setFieldError(name, "");
        setFieldValue(name, value);
    };
    
    const validValues = useMemo(() => Object.values(values).every((v) => v !== ""),[values]);
    const hasErrors = useMemo(() => Object.values(errors).every((v) => v !== ""),[errors]);

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let isInvalid;
        isInvalid = hasErrors || !validValues;
        if (isInvalid) {
            for (let key in values) {
                const fieldName = formConfig.find((f) => f.name === key);
                const { message } = checkValidity(values[key], fieldName.validation);
                setFieldError(key, message);
            }
        } else {
            await onSubmit(values);
        }
    };
    return {
        values,
        errors,
        handleOnChange,
        handleOnSubmit,
    };
};

export default useValidate;
