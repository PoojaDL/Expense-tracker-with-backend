import { Fragment } from "react";
import styles from "./LeaderBoardItem.module.css";

const LeaderBoardItem = (props) => {
  //   console.log(props.data);
  return (
    <Fragment>
      <div className={styles.outerBox}>
        <main className="p-auto m-auto mt-5">
          <div className={styles.header}>
            <h1>Ranking</h1>
          </div>
          <div className={styles.leaderboard}>
            <div className={styles.ribbon}></div>
            <table>
              {props.data.reverse().map((item, i) => {
                if (i === 0) {
                  return (
                    <tr key={i}>
                      <td className={styles.number}>{i + 1}</td>
                      <td className={styles.name}>{item.name}</td>
                      <td className={styles.points}>
                        {item.totalExpense}
                        <img
                          className={styles["gold-medal"]}
                          src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true"
                          alt="gold medal"
                        />
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={i}>
                      <td className={styles.number}>{i + 1}</td>
                      <td className={styles.name}>{item.name}</td>
                      <td className={styles.points}>{item.totalExpense}</td>
                    </tr>
                  );
                }
              })}
            </table>
            <div id="buttons" className="mt-3">
              <button className={styles.exit} onClick={props.close}>
                Exit
              </button>
              <button className={styles.continue}>Continue</button>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default LeaderBoardItem;
