import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { FluentProvider, webLightTheme } from "@fluentui/react-components";

const rootElemenyt = document.getElementById("root") as HTMLElement;

createRoot(rootElemenyt).render(
  <StrictMode>
    <FluentProvider theme={webLightTheme}>
      <App />
    </FluentProvider>
  </StrictMode>,
);
