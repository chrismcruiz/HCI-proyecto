import React from 'react'
import { ErrorMessage, useField, Field } from 'formik'

const SelectFields = ({ label, options, name }) => {
  const [field, meta] = useField(name);
  return (
    <div className="form-group">
       <label className="labels" htmlFor={field.name}>
          <i className='zmdi zmdi-graduation-cap'></i>
        </label>
      <Field type="text" className={`${meta.touched ? meta.error ? 'is-invalid' : 'is-valid cool' : null}`} name={name} list={name} placeholder={label} />
        <datalist id={name}>
          {options.map((carrera, index) => (
            <option key={index} value={carrera}>
              {carrera}
            </option>
          ))}
        </datalist>
        <ErrorMessage component="div" name={field.name} className="invalid-feedback" />
    </div>
  )
}

export default SelectFields
