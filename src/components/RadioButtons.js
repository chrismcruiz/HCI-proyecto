import React from 'react'
import { useField, Field } from 'formik'

const CheckboxField = ({ label, options, ...props }) => {
    const [_, meta] = useField(props);
    return (
        <fieldset className="form-group border p-3"> 
            <legend className="gender-label">Género</legend>
            {options.map((option) => {
                return (
                    <div className="form-check form-check-inline" key={option.key}>
                        <input id={option.value} className="form-check-input" {...props} value={option.value} />
                        <label className="form-check-label gender-options" htmlFor={option.value}>
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