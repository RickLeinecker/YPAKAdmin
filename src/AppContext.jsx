import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { authFlush, authRestore } from "./store/actions/authActions";
import firebase from "./store/firebase";
// TODO : import loading overlay
// TODO : import spinner

export default ({ children, location }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const path = window.location.pathname;

  // TODO : useSelector for states
  const { auth, auth_loading } = useSelector((state) => state.auth);
  const [redirect, setRedirect] = useState("");

  // TODO : loading state
  const _loading = auth_loading;

  // Redirect unauthorized users to login
  //   if (redirect) history.push(redirect);
  //   useEffect(() => {
  //     if (!auth && !auth_loading && (!path || !path.startsWith("/login"))) {
  //       history.push("/login");
  //     } else history.push("/landing");
  //   }, [auth, auth_loading]);

  // Auth handler
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(authRestore(user));
        history.push("/landing");
      } else {
        dispatch(authFlush());
        history.push("/login");
      }
    });
  }, []);

  return <>{_loading ? <>Loading...</> : children}</>;
};
