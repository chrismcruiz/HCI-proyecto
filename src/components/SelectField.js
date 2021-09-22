import React from 'react'
import { useField, Field } from 'formik'

const SelectFields = ({ label, options, name }) => {
  const [field, meta] = useField(name);
  return (
    <div className="form-group">
       <label className="labels" htmlFor={field.name}>
          <i className='zmdi zmdi-graduation-cap'></i>
        </label>
      <Field className={`${meta.touched ? meta.error ? 'is-invalid' : 'is-valid cool' : null}`} name={name} list={name} placeholder={label} />
        <datalist id={name}>
          {options.map((carrera, index) => (
            <option key={index} value={carrera}>
              {carrera}
            </option>
          ))}
        </datalist>
    </div>
  )
}

export default SelectFields
