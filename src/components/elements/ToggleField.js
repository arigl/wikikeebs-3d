import React, { useState } from "react";
import Switch from "react-switch";

const ToggleComponent = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <label>
      <Switch
        onChange={props.handler}
        checked={props.value}
        offColor="#888"
        onColor="#0f0"
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </label>
  );
};

export default ToggleComponent;
