import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../context/auth";

const AuthRoute = ({ component: Component, ...restProps }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...restProps}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default AuthRoute;
