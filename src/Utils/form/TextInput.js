import { ErrorMessage, Field } from "formik";
import { useState } from "react";

const TextInput = ({ name, type, placeholder }) => {
  return (
    <div>
        <label >
          <Field
            className="account__login--input"
            placeholder={placeholder}
            type={type}
            name={name}
          />
           <ErrorMessage name={name} className="error_form" component="div" />
        </label>
    </div>
  );
};

export default TextInput;
