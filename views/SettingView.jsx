import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Image, Switch, Touchable, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/atoms/Button";
import PersonalInfoCard from "../components/molecules/PersonalInfoCard";
import { getPersonalData, getEmployeeImage } from "../services/api.service";
import { ScrollView } from "react-native-gesture-handler";
import { LogOutContext } from "../contexts/logout.context";
import Const from "../const";
import { useDarkMode } from "../contexts/DarkModeContext";
import EditWidgets from "../components/molecules/EditWidgets";
import SwitchContainer from "../components/atoms/SwitchContainer";

const colors = require("../colors.json");

export default function Settings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [personalData, setPersonalData] = useState({});
  const [employeeImage, setEmployeeImage] = useState(null);
  const handleLogout = React.useContext(LogOutContext);
  const [editAppearance, setEditAppearance] = useState(false);

  const fetchPersonalData = async () => {
    try {
      const data = await getPersonalData();
      setPersonalData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployeeImage = async (id) => {
    try {
      const data = await getEmployeeImage(id);
      setEmployeeImage(data);
    } catch {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPersonalData();
  }, []);

  useEffect(() => {
    if (personalData.id) {
      fetchEmployeeImage(personalData.id);
    }
  }, [personalData]);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.dark : colors.background },
      ]}
    >
      <View style={styles.content}>
        <PersonalInfoCard
          isDarkMode={isDarkMode}
          id={personalData.id}
          name={personalData.name}
          surname={personalData.surname}
          birth_date={personalData.birth_date}
          email={personalData.email}
          gender={personalData.gender}
          work={personalData.work}
          employeeImage={employeeImage}
        />
        <EditWidgets />
        <View style={styles.appearanceContainer}>
          <TouchableOpacity
            onPress={() => setEditAppearance(!editAppearance)}
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>
              Edit Appearance
            </Text>
            {editAppearance ? (
              <MaterialCommunityIcons name="chevron-up" size={24} color={colors.lightText} />
            ) : (
              <MaterialCommunityIcons name="chevron-down" size={24} color={colors.lightText} />
            )}
          </TouchableOpacity>
          {editAppearance && (
            <SwitchContainer
              name="Dark Mode"
              value={isDarkMode}
              onValueChange={toggleDarkMode}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Const.SAFE_AREA_TOP,
    backgroundColor: colors.background,
    paddingBottom: 110,
  },
  content: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    alignItems: "center",
    justifyContent: "bottom",
    height: "100%",
    paddingBottom: Const.SAFE_AREA_BOTTOM + 120,
  },
  darkText: {
    fontFamily: Const.FONT_FAMILY_BOLD,
    right: "20%",
  },
  switchContainer: {
    margin: 20,
    position: "absolute",
    bottom: Const.SAFE_AREA_BOTTOM + 180,
    flex: 1,
    alignItems: "center",
  },
  switch: {
    position: "absolute",
    left: "100%",
    bottom: Const.SAFE_AREA_BOTTOM - 90,
  },
  textStyle: {
    paddingRight: "6%",
    color: colors.darkBackground,
    fontFamily: Const.FONT_FAMILY_BOLD,
    fontSize: 18,
  },
  appearanceContainer: {
    width: 350,
    borderRadius: Const.BORDER_RADIUS,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.lightText,
    padding: 5,
  },
});

