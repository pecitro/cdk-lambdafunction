import {
  Combobox,
  makeStyles,
  Option,
  useId,
} from "@fluentui/react-components";
import type { ComboboxProps } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    gap: "2px",
    maxWidth: "400px",
  },
});

export const Default = (props: Partial<ComboboxProps>) => {
  const comboId = useId("combo-default");
  const options = ["Cat", "Dog", "Ferret", "Fish", "Hamster", "Snake"];
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <label id={comboId} htmlFor={`${comboId}-controlled`}>
        Best pet
      </label>
      <Combobox
        id={`${comboId}-controlled`}
        aria-labelledby={comboId}
        placeholder="Select an animal"
        {...props}
        name="pet"
      >
        {options.map((option) => (
          <Option key={option} disabled={option === "Ferret"}>
            {option}
          </Option>
        ))}
      </Combobox>
    </div>
  );
};
