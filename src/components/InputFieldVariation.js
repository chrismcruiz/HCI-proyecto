import React from 'react'
import { ErrorMessage, useField } from 'formik'
import './Forms.css'


const InputFieldVariation = ({ label, classes, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className="form-group">
            <label className="labels" htmlFor={field.name}>
            <i className={`zmdi ${classes}`}></i>
            </label>
            <input
                className={`${meta.touched && meta.error && 'is-invalid'}`}
                {...field} {...props}
                placeholder={label}
                autoComplete="off"
            />
            <ErrorMessage component="div" name={field.name} className="invalid-feedback"/>
        </div>
    )
}

export default InputFieldVariation
