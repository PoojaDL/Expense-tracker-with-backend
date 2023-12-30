import { Fragment, useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import NewExpenseForm from "./NewExpenseForm";
import axios from "axios";
import ExpenseItem from "./ExpenseItem";
import ActivatePremium from "./ActivatePremium";

const Home = () => {
  const [expense, setExpense] = useState([]);
  const fetchAllExpenses = () => {
    const token = localStorage.getItem("expenseUser");
    axios
      .get("http://localhost:3030/home", { headers: { Authorization: token } })
      .then((res) => {
        setExpense(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllExpenses();
  }, []);

  return (
    <Fragment>
      <NavBar />
      <h1>This is Home</h1>
      <ActivatePremium />
      <NewExpenseForm fetchAgain={fetchAllExpenses} />
      {expense.length > 0 &&
        expense
          .reverse()
          .map((item) => (
            <ExpenseItem
              key={item.id}
              id={item.id}
              amount={item.amount}
              description={item.description}
              category={item.category}
              fetchAgain={fetchAllExpenses}
            />
          ))}
    </Fragment>
  );
};

export default Home;
