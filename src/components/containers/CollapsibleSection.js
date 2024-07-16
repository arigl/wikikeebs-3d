import React, { useState } from "react";
import styles from "./CollapsibleSection.module.scss";
import { ReactComponent as Plus } from "../../assets/icons/keyboard-arrow-down.svg";
import { ReactComponent as Minus } from "../../assets/icons/keyboard-arrow-up.svg";

export default function CollapsibleSection(props) {
  const [open, setOpen] = useState(props.open || false);

  const toggleKeyboard = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(!open);
    }
  };

  return (
    <section className={styles.section} aria-label={"Section " + props.title}>
      <header
        tabIndex="0"
        onKeyDown={toggleKeyboard}
        onClick={() => {
          if (props.forceOpen) return;
          setOpen(!open);
        }}
      >
        {props.title}
        {!props.forceOpen && (
          <>
            {!open && <Plus style={{ width: "24px" }} />}
            {open && <Minus style={{ width: "24px" }} />}
          </>
        )}
      </header>
      {open && props.children}
    </section>
  );
}
