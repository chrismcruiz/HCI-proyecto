import React, { useState, useEffect, useRef } from "react";
import { ErrorMessage, useField, Field } from "formik";
import axios from "axios";

const CityField = ({ name }) => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState({
    dpto: "",
    ciudades: [],
  });

  const departmentField = name + ".department";
  const cityField = name + ".city";
  // console.log(departmentField, cityField);
  const [field, meta] = useField(departmentField);
  const [field2, meta2, helpers] = useField(cityField);

  // const [dpto, setDpto] = useState("");
  // const [city, setCity] = useState("");
  // const cityRef = useRef()

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json"
      )
      .then((res) => {
        console.log(res.data);
        setCities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const verifyDpto = (value) => {
    helpers.setValue("");
    const location = cities.find((i) => i.departamento === value);
    if (location !== undefined) {
      setLocation({
        dpto: location.departamento,
        ciudades: [...location.ciudades],
      });
    } else {
      setLocation({ dpto: "", ciudades: {} });
    }
  };

  // console.log(field.value);
  // console.log(helpers);
  return (
    <div>

    <div className="form-group">
      <label className="labels" htmlFor={field.name}>
        <i class="zmdi zmdi-city"></i>
      </label>
      <Field
        // onChange={(e) => verifyDpto(e.target.value)}
        type="text"
        className={`dpto-field input-edit ${
          meta.touched ? (meta.error ? "is-invalid" : "is-valid cool") : null
        }`}
        name={departmentField}
        list={departmentField}
        placeholder={"Departamento"}
        onBlur={(e) => verifyDpto(e.target.value)}
      />
      <datalist id={departmentField}>
        {cities.map((i, index) => (
          <option key={index} value={i.departamento}>
            {i.departamento}
          </option>
        ))}
      </datalist>
      {/* <ErrorMessage
        component="div"
        name={field.name}
        className="invalid-feedback dpto-invalid"
      /> */}
      <label className="labels" htmlFor={field2.name}>
        <i className="zmdi zmdi-graduation-cap"></i>
      </label>
      <Field
        // id={field2.name}
        disabled={location.dpto === "" ? true : false}
        type="text"
        className={`city-field input-edit ${
          meta2.touched ? (meta2.error ? "is-invalid" : "is-valid cool") : null
        }`}
        name={cityField}
        list={cityField}
        placeholder={"Ciudad"}
        // value={city}
        // onChange={(e) => setCity(e.target.value)}
      />
      <datalist id={cityField}>
        {location.dpto !== ""
          ? location.ciudades.map((ciudad, index) => (
              <option key={index} value={ciudad}>
                {ciudad}
              </option>
            ))
          : null}
      </datalist>
      <ErrorMessage
        component="div"
        name={field2.name}
        className="invalid-feedback city-invalid"
      />
    </div>
    </div>
  );
};

export default CityField;
