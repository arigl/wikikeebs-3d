import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TestingPane from "./TestingPane";
import OptionsPane from "./OptionsPane";
import styles from "./Sidebar.module.scss";
import ColorwayEditor from "../colorway/ColorwayEditor";
import "./tabs.scss";

export default function Sidebar() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleLogoClick = () => {
    window.location.href = "https://wikikeebs.com";
  };

  return (
    <div id="sidebar" className={styles.sidebar}>
      <div className={styles.intro}>
        <div className={styles.logoWrapper}>
          <h1 aria-label="Wiki Keebs">
            <a
              href="https://www.wikikeebs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                width="200px"
                src="wide_logo.png"
                alt="wikikeebs"
                style={{ cursor: "pointer" }}
              />
            </a>
          </h1>
        </div>
      </div>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList>
          <Tab tabIndex="0">Options</Tab>
          {/* <Tab tabIndex="0">Studio</Tab> */}
          <Tab tabIndex="0">Test</Tab>
        </TabList>
        <TabPanel>
          <OptionsPane setTab={setTabIndex} />
        </TabPanel>
        {/* <TabPanel>
          <ColorwayEditor />
        </TabPanel> */}
        <TabPanel>
          <TestingPane />
        </TabPanel>
      </Tabs>
    </div>
  );
}
