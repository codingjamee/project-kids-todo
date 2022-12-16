import { Link } from "react-router-dom";
import Card from "../../UI/card/Card";

import classes from "./HomePage.module.css";
import {
  AiOutlinePlusCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";

const HomePage = () => {
  let date = new Date();
  console.log();

  return (
    <Card>
      <div className={classes.month}>
        <Link to="/last-month">
          <AiOutlineArrowLeft />
        </Link>
        <div>{`${date.getMonth() + 1}월 나의미션`}</div>
        <Link to="/next-month">
          <AiOutlineArrowRight />
        </Link>
      </div>
      <ul>
        <li>
          <Card>
            <button>
              <AiOutlinePlusCircle />
            </button>
          </Card>
        </li>
        <li>
          <Card>
            <button>
              <AiOutlinePlusCircle />
            </button>
          </Card>
        </li>
      </ul>
    </Card>
  );
};
export default HomePage;
