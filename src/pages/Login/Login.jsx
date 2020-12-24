import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import TextError from "../../components/TextError";
import { authLogin } from "../../store/actions/authActions";

const Login = () => {
  const dipatch = useDispatch();

  const { auth, auth_loading, auth_error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submittable = !!password && !!email;

  const clearErrors = () => {
    setFormError("");
    setPasswordError("");
    setEmailError("");
  };

  const handelEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    if (!password) {
      setPasswordError("Password cannot be empty");
      return;
    }

    dipatch(authLogin(email, password));
  };

  useEffect(() => {
    if (auth_error) {
      switch (auth_error.code) {
        case "auth/invalid-email":
          setEmailError(auth_error.message);
          break;

        default:
          setFormError(auth_error.message);
      }
    }
  }, [auth_error]);

  useEffect(() => {
    if (auth) setRedirect(true);
  }, []);

  if (process.env.NODE_ENV === "production" && redirect)
    return <Redirect to="/landing" />;

  if (redirect) return <Redirect to="/landing" />;

  //   Uncomment for prod
  //   if (redirect) return <Redirect to="/landing" />;

  return (
    <>
      <Container className="container-centered">
        <Row className="justify-content-center">
          <Col lg="5" md="6" sm="8" xs="12">
            <Form
              className="form-container container--positioned"
              onSubmit={handleSubmit}
            >
              <Form.Group controlId="loginEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handelEmailChange}
                />
                <TextError>{emailError}</TextError>
              </Form.Group>

              <Form.Group controlId="loginPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                <TextError>{passwordError}</TextError>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn-block"
                // disabled={!submittable}
              >
                Submit
              </Button>
              <TextError>{formError}</TextError>
              <TextError>{auth_loading ? "loading..." : ""}</TextError>
              <div className="text-center pt-3">
                <Link to="/login/forgot">Forgot Password</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
