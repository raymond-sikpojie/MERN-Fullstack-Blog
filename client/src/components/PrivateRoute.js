import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  // get token from local storage
  const user = JSON.parse(localStorage.getItem("auth-token"));

  // if user is null let token be an empty string, otherwise set the token.
  const token = user ? user.token : "";
  //   const token = userData.token;
  return (
    // If token is unavailable, make this route unaccessible
    <Route
      {...rest}
      render={(props) =>
        token !== "" ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}
