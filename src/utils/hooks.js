import { useState } from "react";

export const useForm = (callback, initalState = {}) => {
  const [values, setValues] = useState(initalState);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  const handleClickShowPassword = (prop) => {
    setValues({
      ...values,
      [prop]:
        prop === "showPassword"
          ? !values.showPassword
          : !values.showConfirmPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return {
    handleChange,
    handleSubmit,
    handleMouseDownPassword,
    handleClickShowPassword,
    values,
  };
};
