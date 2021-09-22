import React from 'react'
import { useField, Field } from 'formik'

const CheckboxField = ({ label, options, ...props }) => {
    const [_, meta] = useField(props);
    return (
        <fieldset> 
            <legend className="col-form-label">Género</legend>
            {options.map((option) => {
                return (
                    <div className="form-check form-check-inline" key={option.key}>
                        <input id={option.value} className="form-check-input" {...props} value={option.value} />
                        <label className="form-check-label" htmlFor={option.value}>
                            {option.key}
                        </label>
                    </div>
                );
            })}
        </fieldset>

    )
}

export default CheckboxField

// className={`form-control ${meta.touched ? meta.error ? 'is-invalid' : 'is-valid cool' : null}`} 