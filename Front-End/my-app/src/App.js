import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Home from "./Components/Home/Home";
import SignUp from "./Components/Login/SignUp";

function App() {
  const user = localStorage.getItem("expenseUser");
  console.log(user);
  return (
    <div>
      <Route path="/login">
        <SignUp />
      </Route>
      <Route path="/home" exact>
        <Home />
      </Route>

      <Route path="*">
        {user === null && <Redirect to="/login" />}
        {user !== null && <Redirect to="/home" />}
      </Route>
    </div>
  );
}

export default App;
