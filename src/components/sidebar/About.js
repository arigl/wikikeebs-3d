import React from "react";
import styles from "./About.module.scss";
import CollapsibleSection from "../containers/CollapsibleSection";
import { ReactComponent as GithubIcon } from "../../assets/icons/icon_github.svg";

export default function About() {
  return (
    <CollapsibleSection title="About" open={false}>
      <div className={styles.about}>
        <p>
          <a
            href="https://github.com/crsnbrt/keysim"
            rel="noopener noreferrer"
            target="_blank"
            className={styles.github}
          >
            <GithubIcon /> Keyboard Simulator on Github
          </a>
        </p>
        <p>
          I have a deep appreciation for the original developers who began this
          project. Although the project has not been updated in over 3 years,
          this site is dedicated to improving the foundation and adding new core
          features. If anyone is interested in contributing please email
          admin@wikikeebs.com
        </p>
        <p>
          Credit for materials used:{" "}
          <a
            href="https://freepbr.com/materials/brushed-metal1/"
            rel="noopener noreferrer"
            target="_blank"
          >
            material
          </a>
          ,{" "}
          <a
            href="https://hdrihaven.com/hdri/?c=indoor&h=paul_lobe_haus"
            rel="noopener noreferrer"
            target="_blank"
          >
            material
          </a>
        </p>
        <div className={styles.legal}>
          &copy; WikiKeebs in collab with &copy; keyboard simulator (2020)
        </div>
      </div>
    </CollapsibleSection>
  );
}
