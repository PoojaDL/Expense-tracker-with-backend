import { Fragment, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

import classes from "./SignUp.module.css";

const ForgotPassword = () => {
  const emailInput = useRef();

  const forgotPassHandler = (e) => {
    e.preventDefault();
    console.log(emailInput.current.value);
    const email = emailInput.current.value;

    axios
      .post("http://localhost:3030/auth/forgotpassword", { email: email })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Fragment>
        <div className={classes.auth}>
          <Form onSubmit={forgotPassHandler}>
            <h1>Send to my Mail</h1>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              aria-required
            >
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailInput}
                type="email"
                placeholder="name@example.com"
              />
            </Form.Group>
            <div className={classes.actions}>
              <button type="submit">Submit</button>
            </div>
          </Form>
        </div>
      </Fragment>
    </div>
  );
};

export default ForgotPassword;
