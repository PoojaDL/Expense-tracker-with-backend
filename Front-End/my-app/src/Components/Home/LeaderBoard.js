import axios from "axios";
import { Fragment, useState } from "react";
import { Button } from "react-bootstrap";
import LeaderBoardItem from "./LeaderBoardItem";

const LeaderBoard = () => {
  const [showLeaderBoard, setShow] = useState(false);
  const [leaderBoard, setLeaderBoard] = useState([]);
  const token = localStorage.getItem("expenseUser");
  const leaderBoardHandler = () => {
    axios
      .get("http://localhost:3030/premium/leaderBoard", {
        headers: { Authorization: token },
      })
      .then((result) => {
        // console.log(result.data);
        setLeaderBoard(result.data);
        setShow(true);
      })
      .catch((err) => console.log(err));
  };

  const closeHandler = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <Button onClick={leaderBoardHandler}>Show LeaderBoard</Button>
      {showLeaderBoard && (
        <LeaderBoardItem
          key={leaderBoard.name}
          data={leaderBoard}
          close={closeHandler}
        />
      )}
    </Fragment>
  );
};

export default LeaderBoard;
