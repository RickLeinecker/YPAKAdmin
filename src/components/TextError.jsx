import React from "react";
import { Form } from "react-bootstrap";

export default ({ children, center }) => {
  if (children)
    return <Form.Text className={`text-danger ${!!center ? "text-center" : ''}`}>{children}</Form.Text>;
  else return <></>;
};
