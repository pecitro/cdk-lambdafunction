import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

export const authScreenStyles = makeStyles({
  root: {
    ...shorthands.border(
      tokens.strokeWidthThick,
      "solid",
      tokens.colorNeutralBackground3,
    ),
    ...shorthands.padding("40px"),
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  },
  inputList: {
    display: "contents",
    alignItems: "center",
    justifyItems: "center",
    justifyContent: "center",
  },
  input: {
    ...shorthands.margin("10px", 0, 0, 0),
  },
  button: {
    ...shorthands.margin("10px", 0, "10px", 0),
  },
});
