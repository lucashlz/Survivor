import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import KeyValueField from "../atoms/KeyValueField";
import LoadingSpinner from "../atoms/LoadingSpinner";
import Const from "../../const";
import { useDarkMode } from "../../contexts/DarkModeContext";
import Button from "../atoms/Button";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LogOutContext } from "../../contexts/logout.context";

const colors = require("../../colors.json");

const buttonIcon = (name) => {
  switch (name) {
    case "logout":
      return (
        <MaterialCommunityIcons
          name="logout"
          size={29}
          color={colors.lightText}
        />
      );
    default:
      return null;
  }
};

function PersonalInfoCard({ isDarkMode, ...props }) {
  const handleLogout = React.useContext(LogOutContext);

  return (

    <View
      style={[
        styles.info_container,
        {
          backgroundColor: isDarkMode ? "#292828" : colors.shadow,
        },
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          {
            borderColor: isDarkMode ? colors.background : "black",
          },
        ]}
      >
        {props.employeeImage ? (
          <Image
            style={styles.image}
            source={{
              uri: "https://masurao.fr/api/employees/" + props.id + "/image",
            }}
          />
        ) : (
          <LoadingSpinner
            color={isDarkMode ? colors.lightBackground : colors.darkBackground}
          />
        )}
      </View>
      <View style={styles.nameContainer}>
        <Text
          style={[
            styles.nameText,
            {
              color: isDarkMode ? colors.lightBackground : colors.dark,
            },
          ]}
        >
          {`${props.name} ${props.surname}`}
        </Text>
      </View>
      <View style={styles.info}>
        <KeyValueField
          label="Mail"
          value={props.email}
          color={isDarkMode ? colors.background : colors.dark}
          valueStyle={styles.keyValueText}
        />
        <KeyValueField
          label="Birth date"
          value={props.birth_date}
          color={isDarkMode ? colors.background : colors.dark}
          valueStyle={styles.keyValueText}
        />
        <KeyValueField
          label="Gender"
          value={props.gender}
          color={isDarkMode ? colors.background : colors.dark}
          valueStyle={styles.keyValueText}
        />
        <KeyValueField
          label="Work"
          value={props.work}
          color={isDarkMode ? colors.background : colors.dark}
          valueStyle={styles.keyValueText}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Logout"
          buttonStyle={styles.button}
          textStyle={styles.textStyle}
          onPress={handleLogout}
          children={buttonIcon("logout")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  info_container: {
    margin: 5,
    width: 350,
    borderRadius: Const.BORDER_RADIUS,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 52,
    padding: 2,
  },
  nameText: {
    fontSize: 20,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.darkText,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  info: {
    width: "100%",
    flexDirection: "column",
  },
  buttonContainer: {
    alignItems: "center",
    margin: 5,
    borderRadius: Const.BORDER_RADIUS,
  },
  button: {
    flexDirection: "row-reverse",
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    width: 150,
    padding: 5,
    borderWidth: 0,
    backgroundColor: colors.red,
    borderRadius: Const.BORDER_RADIUS + 30,
  },
  textStyle: {
    paddingRight: "5%",
    fontFamily: Const.FONT_FAMILY_BOLD,
    fontSize: 18,
    color: colors.lightText,
  },
});

export default PersonalInfoCard;
