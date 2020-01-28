import React from 'react';

const Switch = (props) => {
  return (
    <section className="controls">
      <label>{props.title}</label>
      <div
        className={props.status ? "switch" : "switch off"}
        onClick={props.switchButton}
      >
        <span></span>
      </div>
    </section>
  );
}

export default Switch;
