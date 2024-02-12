import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { getEmployeeImage, getEmployee } from "../../services/api.service";

import LoadingSpinner from "../atoms/LoadingSpinner";
import Const from "../../const";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { BlurView } from "expo-blur";

const colors = require("../../colors.json");

function KeyValue({ label, value }) {
  return (
    <View style={styles.keyValue}>
      <Text style={styles.key}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function TrombiCard({ id, name, surname, email }) {
  const [employeeImage, setEmployeeImage] = React.useState(null);
  const [employeeInfos, setEmployeeInfos] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { isDarkMode } = useDarkMode();

  const fetchEmployeeImage = async (id) => {
    if (employeeImage == null)
      try {
        const data = await getEmployeeImage(id);
        if (data) setEmployeeImage(data);
      } catch (error) {
        console.error(error);
      }
  };

  const fetchEmployeeInfos = async (id) => {
    if (employeeInfos == null)
      try {
        const data = await getEmployee(id);
        if (data) setEmployeeInfos(data);
      } catch (error) {
        console.error(error);
      }
  };

  React.useEffect(() => {
    fetchEmployeeImage(id);
    fetchEmployeeInfos(id);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDarkMode
                ? colors.lightBackground
                : colors.darkBackground,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            {employeeImage ? (
              <Image
                style={styles.image}
                source={{
                  uri: "https://masurao.fr/api/employees/" + id + "/image",
                }}
              />
            ) : (
              <LoadingSpinner color={colors.lightBackground} />
            )}
          </View>
          <Text
            style={[
              styles.text,
              {
                color: isDarkMode ? colors.darkBackground : colors.lightBackground,
              },
            ]}
          >
            {name}
            {"\n"}
            {surname.toUpperCase()}
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: isDarkMode ? colors.lightBackground : colors.darkBackground,
                backgroundColor: isDarkMode ? colors.primary : colors.primary,
              },
            ]}
            onPress={() => {
              Linking.openURL("mailto:" + email);
            }}
          >
            <Text
              style={[
                styles.buttonTitle,
                {
                  color: isDarkMode ? colors.darkBackground : colors.darkBackground,
                },
              ]}
            >
              Send E-Mail
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <BlurView
            intensity={15}
            tint="dark"
            style={styles.centeredView}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>{name} {surname.toUpperCase()}</Text>
              {employeeInfos ? (
                <View style={styles.infoContainer}>
                  <Text style={styles.workTitle}>{employeeInfos.work}</Text>
                  <KeyValue label="Email" value={employeeInfos.email} />
                  <KeyValue label="Birth Date" value={employeeInfos.birth_date} />
                  <KeyValue label="Gender" value={employeeInfos.gender} />
                </View>
              ) : (
                <LoadingSpinner color={colors.lightBackground} />
              )}
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 180,
    borderRadius: Const.BORDER_RADIUS,
    justifyContent: "top",
    marginVertical: 7,
  },
  imageContainer: {
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  image: {
    width: 180,
    height: 200,
    borderTopRightRadius: Const.BORDER_RADIUS,
    borderTopLeftRadius: Const.BORDER_RADIUS,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: Const.FONT_FAMILY_BOLD,
    textAlign: "center",
    lineHeight: 30,
    paddingTop: 10,
  },
  button: {
    fontSize: 15,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    borderBottomRightRadius: Const.BORDER_RADIUS,
    borderBottomLeftRadius: Const.BORDER_RADIUS,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    padding: 5,
    borderWidth: 5,
  },
  buttonTitle: {
    fontFamily: Const.FONT_FAMILY_BOLD,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#00000050"
  },
  modalView: {
    width: 320,
    height: 420,
    backgroundColor: colors.darkBackground,
    borderRadius: Const.BORDER_RADIUS + 10,
    borderColor: colors.whiteTransparency,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 6,
    elevation: 5,
  },
  modalImage: {
  },
  modalTitle: {
    fontSize: 30,
    fontFamily: Const.FONT_FAMILY_BOLD,
    color: colors.background,
    margin: 5,
    textAlign: "center",
    top: 0,
  },
  workTitle: {
    fontSize: 23,
    fontFamily: Const.FONT_FAMILY,
    color: colors.lightText,
    margin: 5,
    textAlign: "center",
    justifyContent: "center",
    paddingBottom: 0,
    bottom: 5,
  },
  infoContainer: {
    width: "100%",
    paddingTop: 20,
  },
  infoText: {
    fontFamily: Const.FONT_FAMILY,
    fontSize: 20,
    padding: 20,
    color: colors.lightText,
  },
  boldLabel: {
    fontFamily: Const.FONT_FAMILY_BOLD,
    fontWeight: 'bold',
    color: colors.lightText,
  },
  keyValue: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    fontFamily: Const.FONT_FAMILY_BOLD,
    fontSize: 20,
    color: colors.lightText,
  },
  value: {
    fontFamily: Const.FONT_FAMILY,
    fontSize: 20,
    color: colors.lightText,
    marginTop: 10,
  },
});
