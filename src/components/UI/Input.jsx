import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.control}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={ref}
        type={props.type}
        id={props.id}
        value={props.value}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        title={props.placeholder}
        onBlur={props.onBlur}
        placeholder={props.placeholder}
      />
    </div>
  );
});
export default Input;
