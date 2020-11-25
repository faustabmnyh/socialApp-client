import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  makeStyles,
  OutlinedInput,
  TextField,
} from "@material-ui/core";
import { useContext, useState } from "react";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Alert from "@material-ui/lab/Alert";

import { REGISTER_USER } from "../queries";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "70%",
  },
}));

const Register = () => {
  const classes = useStyles();
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { login } = useContext(AuthContext);

  const {
    handleChange,
    handleSubmit,
    values,
    handleMouseDownPassword,
    handleClickShowPassword,
  } = useForm(registerUser, {
    password: "",
    showPassword: false,
    showConfirmPassword: false,
    username: "",
    email: "",
    confirmPassword: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    //  this update will trigger if the register successfuly
    update(proxy, { data: { register: userData } }) {
      history.push("/");
      login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className={classes.root}>
      <h3 className="register__title">Register</h3>
      <form onSubmit={handleSubmit} noValidate className="register__form">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {" "}
            <TextField
              label="Username"
              variant="outlined"
              value={values.username}
              error={errors.username ? true : false}
              onChange={handleChange("username")}
              className={clsx(classes.margin, classes.textField)}
            />
            <TextField
              label="Email"
              variant="outlined"
              value={values.email}
              error={errors.email ? true : false}
              onChange={handleChange("email")}
              className={clsx(classes.margin, classes.textField)}
            />
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange("password")}
                error={errors.password ? true : false}
                label="Password"
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("showPassword")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                }
              />
            </FormControl>
            <FormControl
              className={clsx(classes.margin, classes.textField)}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-confirmPassword">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirmPassword"
                type={values.showConfirmPassword ? "text" : "password"}
                value={values.confirmPassword}
                onChange={handleChange("confirmPassword")}
                error={errors.confirmPassword ? true : false}
                label="Confirm Password"
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      handleClickShowPassword("showConfirmPassword")
                    }
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showConfirmPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                }
              />
            </FormControl>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              className="register__btn"
            >
              Register
            </Button>
            <div>
              {Object?.keys(errors)?.length > 0 &&
                Object?.values(errors)?.map((value) => {
                  return (
                    <Alert severity="error" key={value}>
                      {value}
                    </Alert>
                  );
                })}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
