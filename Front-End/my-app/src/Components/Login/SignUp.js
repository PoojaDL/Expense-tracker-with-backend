import { Fragment, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

import classes from "./SignUp.module.css";

const SignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [load, setLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const emailInput = useRef();
  const nameInput = useRef();
  const passInput = useRef();
  const confPassInput = useRef();

  const switchAuthModeHandler = (e) => {
    e.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3030/login")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterUsers = (email) => {
    return users.filter((user) => user.email === email);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const name = nameInput.current.value;
    const email = emailInput.current.value;
    const password = passInput.current.value;
    let confPassword = "";

    if (name && email && password) {
      setLoad(true);
      let data = {
        name: name,
        email: email,
        password: password,
      };

      if (isLogin) {
        const user = filterUsers(email);

        if (
          user[0].email == email &&
          user[0].name == name &&
          user[0].password == password
        ) {
          alert("He can login");
        } else if (user[0].email == email && user[0].password != password) {
          alert("User not authorized");
        } else {
          alert("User doesn't Exist");
        }
      }

      if (!isLogin) {
        const user = filterUsers(email);
        if (user.length === 0) {
          confPassword = confPassInput.current.value;
          data = { ...data, confPassword: confPassword };
          console.log("This is sign-in", data);
          axios
            .post("http://localhost:3030/login", data)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        } else {
          alert("User already exists");
        }
      }
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
              controlId="exampleForm.ControlInput0"
              aria-required
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                ref={nameInput}
                type="text"
                placeholder="Your name"
              />
            </Form.Group>
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
