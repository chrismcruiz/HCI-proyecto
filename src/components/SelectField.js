import React from 'react'
import { useField, Field } from 'formik'

const SelectFields = ({ label, options, name }) => {
  const [field, meta] = useField(name);
  return (
    <div className="form-floating mb-2">
      <Field className={`form-select ${meta.touched ? meta.error ? 'is-invalid' : 'is-valid cool' : null}`} id={name} name={name} as="select">
        <option value="" defaultValue disabled>
          Escoge una opción
        </option>
        {options.map((carrera, index) => (
          <option key={index} value={carrera}>
            {carrera}
          </option>
        ))}
      </Field>
      <label className="label-color" htmlFor="career">
        {label}
      </label>
    </div>
  )
}

export default SelectFields
