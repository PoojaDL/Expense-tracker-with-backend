import { Fragment, useRef, useState } from "react";
import { Form } from "react-bootstrap";

import classes from "./SignUp.module.css";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [load, setLoad] = useState(false);
  const emailInput = useRef();
  const passInput = useRef();
  const confPassInput = useRef();

  const switchAuthModeHandler = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const email = emailInput.current.value;
    const password = passInput.current.value;
    let confPassword = "";
    if (!isLogin) {
      confPassword = confPassInput.current.value;
    }

    if (email && password) {
      setLoad(true);
      //   let url;
      //   if (isLogin) {
      //     url =
      //       "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s";
      //   } else if (!isLogin && password !== confPassword) {
      //     alert("Enter the same password");
      //   } else {
      //     url =
      //       "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8wHsJTe8rHFeXPPHA5u0R9NWkWsuix3s";
      //   }

      //   fetch(url, {
      //     method: "POST",
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //       returnSecureToken: true,
      //     }),
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   })
      //     .then((res) => {
      //       setLoad(false);
      //       if (res.ok) {
      //         return res.json();
      //       } else {
      //         return res.json().then((data) => {
      //           let errorMessage = data.error.message;
      //           throw new Error(errorMessage);
      //         });
      //       }
      //     })
      //     .then((data) => {
      //       dispatch(authActions.login(data));
      //       if (isLogin) {
      //         history.replace("./");
      //       } else {
      //         alert("Account created successfully..!");
      //         emailInput.current.value = "";
      //         passInput.current.value = "";
      //         setIsLogin((prevState) => !prevState);
      //         history.replace("./");
      //       }
      //     })
      //     .catch((error) => alert(error));
    } else {
      alert("Enter the inputs before submitting");
    }
  };

  return (
    <div>
      <Fragment>
        <div className={classes.auth}>
          <Form onSubmit={formSubmitHandler}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput3"
              required
            >
              <Form.Label>Password</Form.Label>
              <Form.Control ref={passInput} type="password" />
            </Form.Group>
            {!isLogin && (
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
                required
              >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control ref={confPassInput} type="password" />
              </Form.Group>
            )}
            {/* <Link to="/forgotpassword" style={{ color: "red" }}>
              forgot password?
            </Link> */}
            <div className={classes.actions}>
              {load ? (
                <p style={{ color: "black" }}>Sending request...</p>
              ) : (
                <button>{isLogin ? "Login" : "Create account"}</button>
              )}

              <button
                type="button"
                className={classes.toggle}
                onClick={switchAuthModeHandler}
              >
                <p style={{ color: "white" }}>
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </p>
              </button>
            </div>
          </Form>
        </div>
      </Fragment>
    </div>
  );
};

export default SignUp;
