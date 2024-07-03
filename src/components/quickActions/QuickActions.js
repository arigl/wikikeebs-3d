import React from "react";
import Permalink from "./Permalink";
import ScreenShot from "./ScreenShot";
import { ReactComponent as GithubIcon } from "../../assets/icons/icon_github.svg";
import styles from "./action.module.scss";

export default function QuickActions() {
  return (
    <div className={styles.actionBar}>
      <Permalink />
      <ScreenShot />
    </div>
  );
}
