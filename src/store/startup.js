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
  const item = arr[Math.floor(Math.random() * arr.length)];
  return item;
};

export const getInitialState = () => {
  let qs = get_qs_values();

  let saved_colorways = loadState();

  let initial = JSON.parse(JSON.stringify(settings)); // Ensures we have a mutable deep copy

  if (saved_colorways) {
    initial.colorways.custom = saved_colorways.settings;
  }

  // Set random initial values
  if (!qs) {
    initial.colorways.active = randomItem(starting_colorway_options);
    initial.case.layout = randomItem(starting_layout_options);
    // initial.keys.legendSecondaryStyle = randomItem([
    //   randomItem(subOptions),
    //   "",
    // ]);
    initial.keys.legendSecondaryStyle = "";
  }

  if (saved_colorways && saved_colorways.active) {
    initial.colorways.active = saved_colorways.active;
  }

  if (qs && qs["debug"]) {
    initial.settings.debug = true;
  }

  // Set initial values if in query string
  if (qs && qs["size"]) {
    initial.case.layout = qs["size"];
  }
  if (qs && qs["colorway"]) {
    if (typeof qs["colorway"] === "object") {
      if (!initial.colorways.custom.find((x) => x.id === qs["colorway"].id)) {
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
    initial.keys.legendSecondaryStyle = qs["sub"];
  }
  if (qs && qs["cc"]) {
    initial.case.primaryColor = `#${qs["cc"]}`;
    initial.case.autoColor = false;
  }
  if (qs && qs["cf"]) {
    initial.case.material = qs["cf"];
  }

  let accent = "";
  if (qs && typeof qs["colorway"] === "object") {
    accent = qs["colorway"].swatches.accent.background;
  } else {
    accent =
      COLORWAYS[initial?.colorways?.active]?.swatches?.accent?.background;
  }
  initial.settings.sceneColor = accent;

  return initial;
};

export const initial_settings = getInitialState();
