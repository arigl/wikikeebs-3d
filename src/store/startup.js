import { get_qs_values } from "./qs";
import { loadState } from "./localStorage";
import { subOptions } from "../config/legends/subs/subs";
import COLORWAYS from "../config/colorways/colorways";
import settings from "../config/settings_user_default.json";

const starting_colorway_options = [
  "cafe",
  "mecha",
  "lunar",
  "jamon",
  "bento",
  "olivia",
  "striker",
  "bushido",
  "oblivion",
  "nautilus",
  "vilebloom",
  "handarbeit",
  "hammerhead",
  "modern_dolch",
  "blue_samurai",
  "red_samurai",
];

const starting_layout_options = ["60iso", "65"];

let randomItem = (arr) => {
  console.log("Selecting random item from array:", arr);
  const item = arr[Math.floor(Math.random() * arr.length)];
  console.log("Selected random item:", item);
  return item;
};

export const getInitialState = () => {
  console.log("Getting query string values");
  let qs = get_qs_values();
  console.log("Query string values:", qs);

  console.log("Loading saved colorways from localStorage");
  let saved_colorways = loadState();
  console.log("Saved colorways:", saved_colorways);

  console.log("Cloning settings object to ensure mutability");
  let initial = JSON.parse(JSON.stringify(settings)); // Ensures we have a mutable deep copy

  if (saved_colorways) {
    console.log("Assigning saved colorways to initial state");
    initial.colorways.custom = saved_colorways.settings;
  }

  // Set random initial values
  if (!qs) {
    console.log("No query string detected, setting random initial values");
    initial.colorways.active = randomItem(starting_colorway_options);
    initial.case.layout = randomItem(starting_layout_options);
    // initial.keys.legendSecondaryStyle = randomItem([
    //   randomItem(subOptions),
    //   "",
    // ]);
    initial.keys.legendSecondaryStyle = "";
  }

  if (saved_colorways && saved_colorways.active) {
    console.log("Setting active colorway from saved colorways");
    initial.colorways.active = saved_colorways.active;
  }

  if (qs && qs["debug"]) {
    console.log("Debug mode enabled in query string");
    initial.settings.debug = true;
  }

  // Set initial values if in query string
  if (qs && qs["size"]) {
    console.log("Setting layout size from query string:", qs["size"]);
    initial.case.layout = qs["size"];
  }
  if (qs && qs["colorway"]) {
    console.log("Setting colorway from query string:", qs["colorway"]);
    if (typeof qs["colorway"] === "object") {
      if (!initial.colorways.custom.find((x) => x.id === qs["colorway"].id)) {
        console.log("Adding new colorway to custom colorways");
        initial.colorways.custom.push(qs["colorway"]);
      }
      initial.colorways.active = qs["colorway"].id;
    } else {
      initial.colorways.active = qs["colorway"];
    }
  }
  if (qs && qs["legend"]) {
    console.log(
      "Setting legend primary style from query string:",
      qs["legend"]
    );
    initial.keys.legendPrimaryStyle = qs["legend"];
  }
  if (qs && qs["sub"]) {
    console.log("Setting legend secondary style from query string:", qs["sub"]);
    initial.keys.legendSecondaryStyle = qs["sub"];
  }
  if (qs && qs["cc"]) {
    console.log("Setting primary color from query string:", qs["cc"]);
    initial.case.primaryColor = `#${qs["cc"]}`;
    initial.case.autoColor = false;
  }
  if (qs && qs["cf"]) {
    console.log("Setting case material from query string:", qs["cf"]);
    initial.case.material = qs["cf"];
  }

  let accent = "";
  if (qs && typeof qs["colorway"] === "object") {
    console.log("Setting accent color from query string colorway object");
    accent = qs["colorway"].swatches.accent.background;
  } else {
    console.log("Setting accent color from COLORWAYS configuration");
    accent =
      COLORWAYS[initial?.colorways?.active]?.swatches?.accent?.background;
  }
  initial.settings.sceneColor = accent;
  console.log("Final initial state:", initial);

  return initial;
};

export const initial_settings = getInitialState();
