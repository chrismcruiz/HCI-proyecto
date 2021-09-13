import React from 'react'
import { useField, Field } from 'formik'

const CheckboxField = ({ label, options, ...props }) => {
    const [_, meta] = useField(props); 
    return (
        <div className="form-floating mb-2">
            <div className={`form-control ${meta.touched ? meta.error ? 'is-invalid' : 'is-valid cool' : null}`} >
                {options.map((option) => {
                return (
                    <div className="form-check form-check-inline" key={option.key}>
                        <Field id={option.value} className="inputs_radius" {...props} value={option.value} />
                        <label className="form-check-label" htmlFor={option.value}>
                        {option.key}
                        </label>
                    </div>
                );
                })}
            </div>
            <label className="label-color">{label}</label>
        </div>    
    )
}

export default CheckboxField
