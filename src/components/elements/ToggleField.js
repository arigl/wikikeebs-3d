import React, { useState } from "react";
import Switch from "react-switch";

const ToggleComponent = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  return (
    <label>
      <span>Toggle Switch</span>
      <Switch
        onChange={handleChange}
        checked={checked}
        offColor="#888"
        onColor="#0f0"
        uncheckedIcon={false}
        checkedIcon={false}
      />
    </label>
  );
};

export default ToggleComponent;
