export const getInitialValues = (formConfig, initialValues) =>{
    const values = formConfig.reduce((acc,{key}) => {
        if(!initialValues) acc[key] = ""
        else acc[key] = initialValues?.[key]
        return acc
    },{})
    return values;
}