import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";

import React, { useEffect, useRef } from "react";

export default function AirDatepickerReact(props) {
  const $input = useRef();
  const datePicker = useRef();

  // Start init
  useEffect(() => {
    // Save instance for the further update
    datePicker.current = new AirDatepicker($input.current, { ...props });
  }, []);

  useEffect(() => {
    if (props.startDate !== undefined) {
      datePicker.current.setViewDate(props.startDate);
    }
  }, [props.startDate]);

  if (props.inline === true) {
    return (
      <div className="datepicker-container">
        <div className="datepicker" id={props.id} ref={$input}></div>
      </div>
    );
  }
  return (
    <div className="input-container">
      <div className="datepicker-here" id={props.id}></div>
      <input name={props.name} ref={$input} />
    </div>
  );

}
