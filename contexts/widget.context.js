import React, { createContext, useContext, useState } from "react";
import { WIDGETS } from "../widget";

const widgetContext = createContext();

export const useWidget = () => {
  const context = useContext(widgetContext);
  if (!context) {
    throw new Error("useWidget must be used within a WidgetProvider");
  }
  return context;
};

export const WidgetProvider = ({ children }) => {
  const [widgetUse, setWidgetUse] = useState(() => {
    const widgetUse = {};
    WIDGETS.map((widget, index) => {
      widgetUse[widget.key] = widget.use;
    });
    return widgetUse;
  });

  const toggleWidget = async (key) => {
    widgetUse[key] = !widgetUse[key];
    setWidgetUse({ ...widgetUse });
  };

  return (
    <widgetContext.Provider value={{ widgetUse, toggleWidget }}>
      {children}
    </widgetContext.Provider>
  );
};
