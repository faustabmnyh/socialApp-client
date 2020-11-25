import { AppBar, Avatar, Box, Button, Toolbar } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

const AppBars = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <AppBar position="static" color="default">
          <Container>
            <Toolbar>
              <div style={{ width: "100%" }}>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Link className="appBars__link" to="/">
                      <Button
                        color="secondary"
                        disabled
                        startIcon={<Avatar src="/images/mencoba.jpg" />}
                      >
                        {user.username}
                      </Button>
                    </Link>
                  </Box>
                  <Link className="appBars__link btn_2" onClick={logout}>
                    <Button color="secondary" variant="contained">
                      Logout
                    </Button>
                  </Link>
                </Box>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar position="static" color="default">
          <Container>
            <Toolbar>
              <div style={{ width: "100%" }}>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Link className="appBars__link" to="/">
                      <Button color="secondary">Home</Button>
                    </Link>
                  </Box>
                  <Box>
                    <Link className="appBars__link" to="/register">
                      <Button color="secondary" variant="outlined">
                        Register
                      </Button>
                    </Link>
                  </Box>
                  <Link className="appBars__link btn_3" to="/login">
                    <Button color="secondary" variant="contained">
                      Login
                    </Button>
                  </Link>
                </Box>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </>
  );
};

export default AppBars;
