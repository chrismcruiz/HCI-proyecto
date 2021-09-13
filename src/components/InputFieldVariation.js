import React from 'react'
import { ErrorMessage, useField } from 'formik'

const InputFieldVariation = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-floating mb-2">
            <input
                className={`form-control ${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                placeholder={field.name}
                autoComplete="off"
            />
            <label className="label-color" htmlFor={field.name}>
                {label}
            </label>
            <ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
        </div>
    )
}

export default InputFieldVariation
