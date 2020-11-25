import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppBars from "./Components/AppBars";
import SinglePost from "./pages/SinglePost";

import { Container } from "@material-ui/core";
import { setContext } from "apollo-link-context";
import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/authRoute";

const httpLink = createHttpLink({
  uri: "https://pure-eyrie-42141.herokuapp.com/",
});

// this is setContext , kind a works like middleware so it accept context of this request and kind a modifier what i wanna like do before that request has proces forwaded toward http links
const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    // this is gonna add tehe authorization header
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <Router>
          <AppBars />
          <Container>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/login" component={Login} />
            <Route exact path="/posts/:id" component={SinglePost} />
          </Container>
        </Router>
      </ApolloProvider>
    </AuthProvider>
  );
}
export default App;
