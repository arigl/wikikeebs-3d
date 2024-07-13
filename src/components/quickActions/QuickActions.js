import React from "react";
import Permalink from "./Permalink";
import ScreenShot from "./ScreenShot";
import styles from "./action.module.scss";

export default function QuickActions() {
  return (
    <div className={styles.actionBar}>
      <Permalink />
      <ScreenShot />
    </div>
  );
}
