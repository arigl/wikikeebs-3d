import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ColorwayEditor.module.scss";
import Button from "../elements/Button";
import Swatch from "./Swatch";
import ColorUtil from "../../util/color";
import ToggleField from "../elements/ToggleField";
import CollapsibleSection from "../containers/CollapsibleSection";
import Util from "../../util/math";
import {
  selectColorway,
  setActiveSwatch,
  selectActiveSwatch,
  selectColorways,
  updateCustomColorway,
  addCustomColorway,
  toggleEditing,
  setColorway,
} from "../../store/slices/colorways";
import {
  togglePaintWithKeys,
  selectPaintWithKeys,
} from "../../store/slices/settings";

export default function ColorwayEditor() {
  const dispatch = useDispatch();
  const colorwayId = useSelector(selectColorway);
  const colorwayList = useSelector(selectColorways);
  const paintWithKeys = useSelector(selectPaintWithKeys);
  const activeSwatch = useSelector(selectActiveSwatch);

  const [localColorway, setLocalColorway] = useState(null);
  const previousSwatchesRef = useRef(null);

  useEffect(() => {
    console.log("useEffect - Initial Setup");
    let colorway = colorwayList.find((x) => x.id === colorwayId);
    if (!colorway) {
      colorway = JSON.parse(JSON.stringify(ColorUtil.getColorway(colorwayId)));
      colorway.label += " modified";
      colorway.id = `cw_${Util.randString()}`;
      dispatch(addCustomColorway(colorway));
      console.log("Dispatched addCustomColorway:", colorway);
      dispatch(setColorway(colorway.id));
      console.log("Dispatched setColorway:", colorway.id);
    }
    setLocalColorway(colorway);
    console.log("Set localColorway:", colorway);
  }, [colorwayId, colorwayList, dispatch]);

  useEffect(() => {
    console.log("useEffect - Toggle Editing");
    dispatch(toggleEditing());
    console.log("Dispatched toggleEditing");
    return () => {
      dispatch(toggleEditing());
      console.log("Dispatched toggleEditing (cleanup)");
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("useEffect - Editing Class");
    document.body.classList.add("editing");
    return () => {
      document.body.classList.remove("editing");
    };
  }, []);

  useEffect(() => {
    console.log("colorway state updated:", localColorway);

    if (localColorway) {
      const currentSwatches = localColorway.swatches;
      const previousSwatches = previousSwatchesRef.current;

      if (
        JSON.stringify(currentSwatches) !== JSON.stringify(previousSwatches)
      ) {
        console.log("Swatches changed:", currentSwatches);
        previousSwatchesRef.current = currentSwatches;
      }
    }
  }, [localColorway]);

  const updateName = (e) => {
    if (localColorway) {
      let updatedColorway = { ...localColorway, label: e.target.value };
      dispatch(updateCustomColorway(updatedColorway));
      console.log("Dispatched updateCustomColorway:", updatedColorway);
      setLocalColorway(updatedColorway);
    }
  };

  const handleSwatchChange = (swatch, val) => {
    if (localColorway && localColorway.swatches) {
      let updatedColorway = {
        ...localColorway,
        swatches: { ...localColorway.swatches, [swatch]: val },
      };
      dispatch(updateCustomColorway(updatedColorway));
      console.log("Dispatched updateCustomColorway:", updatedColorway);
      setLocalColorway(updatedColorway);
      let event = new CustomEvent("force_key_material_update");
      document.dispatchEvent(event);
    }
  };

  // const removeSwatch = (name) => {
  //   if (localColorway && localColorway.swatches[name]) {
  //     let updatedColorway = { ...localColorway };
  //     Object.keys(updatedColorway.override).forEach((key) => {
  //       if (updatedColorway.override[key] === name)
  //         delete updatedColorway.override[key];
  //     });
  //     delete updatedColorway.swatches[name];
  //     dispatch(updateCustomColorway(updatedColorway));
  //     console.log("Dispatched updateCustomColorway:", updatedColorway);
  //     setLocalColorway(updatedColorway);
  //     let event = new CustomEvent("force_key_material_update");
  //     document.dispatchEvent(event);
  //   }
  // };

  const removeSwatch = (name) => {
    if (localColorway && localColorway.swatches[name]) {
      // Create a shallow copy of the colorway object
      let updatedColorway = { ...localColorway };

      // Create a shallow copy of the swatches object
      updatedColorway.swatches = { ...updatedColorway.swatches };

      // Remove the specified swatch
      delete updatedColorway.swatches[name];

      // Remove references in the override object
      updatedColorway.override = { ...updatedColorway.override };
      Object.keys(updatedColorway.override).forEach((key) => {
        if (updatedColorway.override[key] === name) {
          delete updatedColorway.override[key];
        }
      });

      // Dispatch the updated colorway to the store
      dispatch(updateCustomColorway(updatedColorway));
      console.log("Dispatched updateCustomColorway:", updatedColorway);

      // Update the local state
      setLocalColorway(updatedColorway);

      // Dispatch an event to update key materials
      let event = new CustomEvent("force_key_material_update");
      document.dispatchEvent(event);
    }
  };

  const addSwatch = () => {
    if (localColorway) {
      let new_swatch_id =
        "swatch-" + (Object.keys(localColorway.swatches).length - 2);
      let updatedColorway = {
        ...localColorway,
        swatches: {
          ...localColorway.swatches,
          [new_swatch_id]: ColorUtil.getRandomAccent(),
        },
      };
      dispatch(updateCustomColorway(updatedColorway));
      console.log("Dispatched updateCustomColorway:", updatedColorway);
      setLocalColorway(updatedColorway);
      dispatch(setActiveSwatch(new_swatch_id));
      console.log("Dispatched setActiveSwatch:", new_swatch_id);
    }
  };

  const swatches = localColorway ? Object.keys(localColorway.swatches) : [];

  return (
    <>
      <CollapsibleSection title="Colorway Editor" open={true}>
        <div className={styles.editor}>
          {/* <ToggleField
            value={paintWithKeys}
            label={"Apply swatches on keypress"}
            help={"Apply the selected swatch to each key pressed."}
            handler={() => dispatch(togglePaintWithKeys())}
          /> */}

          <div className={styles.name}>
            <label htmlFor="colorway_name" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="colorway_name"
              name="colorway_name"
              value={localColorway ? localColorway.label : ""}
              onChange={updateName}
            />
          </div>

          <fieldset>
            <legend className={styles.label}>Swatches</legend>
            <p className={styles.description}>
              A swatch consists of a background color and a legend color.
            </p>

            <ul>
              {swatches.map((swatch) => (
                <Swatch
                  key={swatch}
                  name={swatch}
                  swatch={localColorway.swatches[swatch]}
                  handler={handleSwatchChange}
                  active={activeSwatch}
                  setSwatch={(name) => dispatch(setActiveSwatch(name))}
                  remove={(name) => removeSwatch(name)}
                />
              ))}
            </ul>
            <Button isText={false} title="Add Swatch" handler={addSwatch} />
          </fieldset>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Advanced">
        <div className={styles.json}>
          <label htmlFor="colorway_json">Colorway JSON (readonly)</label>
          <textarea
            readOnly
            id="colorway_json"
            name="colorway_json"
            spellCheck="false"
            value={JSON.stringify(localColorway, null, 1)}
          />
        </div>
      </CollapsibleSection>
    </>
  );
}
