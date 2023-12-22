import { Fragment, useEffect, useState } from "react";
import NavBar from "../Navbar/Navbar";
import NewExpenseForm from "./NewExpenseForm";
import axios from "axios";
import ExpenseItem from "./ExpenseItem";

const Home = () => {
  const [expense, setExpense] = useState([]);
  const email = localStorage.getItem("expenseUser");

  const fetchAllExpenses = () => {
    axios
      .get("http://localhost:3030/home", { params: { email: email } })
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
