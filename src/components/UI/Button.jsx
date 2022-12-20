import { forwardRef } from "react";
import classes from "./Button.module.css";

const Button = forwardRef((props, ref) => {
  return (
    <button
      ref={ref}
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
});

export default Button;
