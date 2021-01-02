import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

// If no auth or auth is not yet loaded
// Protected Route does not display protected pages.
const ProtectedRoute = ({ component: Component, superOnly=false, ...rest }) => {
  const { auth, auth_loaded } = useSelector((state) => state.auth);

  // TODO : unauthorized page
  // TODO : unauthorized page (not privelaged/super admin)

  return <Route {...rest} render={
	  props => !auth || !auth_loaded ? undefined :
		  (!superOnly || auth.super ? <Component {...rest} {...props} /> :
			<><h1>Unauthoized!</h1><h2>Super Admins Only</h2></>)
  } />;
};

export default ProtectedRoute;