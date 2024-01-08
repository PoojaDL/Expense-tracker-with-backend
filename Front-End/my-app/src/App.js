import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Login/SignUp";
import ForgotPassword from "./Components/Login/ForgotPassword";
import ResetPassword from "./Components/Login/ResetPassword";

function App() {
  const user = localStorage.getItem("expenseUser");
  console.log(user);
  return (
    <div>
      <Route path="/forgotpassword" exact>
        <ForgotPassword />
      </Route>
      <Route path="/resetpassword/:id/:token">
        <ResetPassword />
      </Route>
      {user !== null && (
        <Route path="/login">
          <SignUp />
        </Route>
      )}
      {user !== null && (
        <Route path="/home">
          <Home />
        </Route>
      )}

      {/* <Route path="*">
        {user === null && <Redirect to="/login" />}
        {user !== null && <Redirect to="/home" />}
      </Route> */}
    </div>
  );
}

export default App;
