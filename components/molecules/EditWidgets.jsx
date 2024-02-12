import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SwitchContainer from "../atoms/SwitchContainer";
import { WIDGETS } from "../../widget";
import Const from "../../const";
import { useWidget } from "../../contexts/widget.context";

const colors = require("../../colors.json");

export default function EditWidgets() {
  const { widgetUse, toggleWidget } = useWidget();
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text style={styles.title}>Edit Widgets</Text>
        {isVisible ? (
          <MaterialCommunityIcons name="chevron-up" size={24} color={colors.lightText} />
        ) : (
          <MaterialCommunityIcons name="chevron-down" size={24} color={colors.lightText} />
        )}
      </TouchableOpacity>
      {isVisible ? (
      WIDGETS.map((widget, index) => {
        if (widget.use) {
          return (
            <SwitchContainer
              key={index}
              name={widget.name}
              value={widgetUse[widget.key]}
              onValueChange={() => (
                toggleWidget(widget.key), console.log(widgetUse)
              )}
            />
          );
        }
      })) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    borderRadius: Const.BORDER_RADIUS,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.lightText,
    padding: 5,
  },
});
