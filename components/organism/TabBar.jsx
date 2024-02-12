import { View, Dimensions, StyleSheet } from "react-native";
import NavIcons from "../atoms/NavIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import Const from "../../const";
import { useDarkMode } from "../../contexts/DarkModeContext";

const colors = require("../../colors.json");

const { width } = Dimensions.get("window");

const TabBar = ({ state, descriptors, navigation }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={[
          { backgroundColor: isDarkMode ? colors.background : colors.background },
          styles.container,
        ]}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented)
              navigation.navigate(route.name);
          };

          return (
            <View
              key={index}
              style={[
                styles.mainItemContainer,
                { borderRightWidth: label === "Setting" ? 0 : 3 },
                {
                  borderRightColor: isDarkMode
                    ? colors.background
                    : colors.background,
                },
              ]}
            >
              <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: isDarkMode
                        ? colors.background
                        : colors.background,
                    },
                  ]}
                >
                  <NavIcons label={label} focused={isFocused} />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 20,
    flexDirection: "row",
    marginBottom: "4.5%",
    width: width * 0.7,
    height: Const.TABBAR_HEIGHT,
    borderRadius: Const.BORDER_RADIUS + 5,
    marginHorizontal: width * 0.15,
    borderColor: colors.background,
    justifyContent: "center",
    position: "absolute",
    bottom: 3,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1,
  },
  itemContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabBar;
