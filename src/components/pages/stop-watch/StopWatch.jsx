import { useEffect, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import classes from "./StopWatch.module.css";
import { v4 as uuidv4 } from "uuid";

const StopWatch = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);
  const [records, setRecords] = useState([]);

  const startHandler = () => {
    setStart((prev) => !prev);
  };

  const resetHandler = () => {
    setMinutes(0);
    setSeconds(0);
  };

  const recordHandler = () => {
    setRecords(records.concat({ minutes: minutes, seconds: seconds }));
  };

  useEffect(() => {
    if (start) {
      const timer = setInterval(() => {
        if (seconds < 59) {
          setSeconds((prev) => prev + 1);
        } else if (seconds === 59) {
          setMinutes((prev) => prev + 1);
          setSeconds(0);
        } else {
          setSeconds((prev) => prev + 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [minutes, seconds, start]);

  return (
    <>
      <Card>
        <div className={classes.watch}>
          <div>
            {minutes}분 {seconds < 10 ? `0${seconds}` : seconds} 초 지났어요
          </div>
          <div className={classes.buttons}>
            <Button onClick={startHandler}>
              {start ? "일시정지" : "시작"}
            </Button>
            <Button onClick={resetHandler}>초기화</Button>
            <Button onClick={recordHandler}>기록</Button>
          </div>
        </div>
      </Card>
      {records &&
        records.map((record) => (
          <Card key={uuidv4()}>
            기록! {record.minutes}분 {record.seconds}초
          </Card>
        ))}
    </>
  );
};
export default StopWatch;
