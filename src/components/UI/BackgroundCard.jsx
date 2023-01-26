import classes from "./BackgroundCard.module.css";

const BackgroundCard = (props) => {
  return (
    <div
      className={`${classes.background} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default BackgroundCard;
