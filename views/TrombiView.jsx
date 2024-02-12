import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import TrombiCard from "../components/molecules/TrombiCard";
import { getEmployees } from "../services/api.service";
import Const from "../const";
import { useDarkMode } from "../contexts/DarkModeContext";
import TextSubmit from "../components/molecules/TextSubmit";

const colors = require("../colors.json");

const filerEmployees = (employees, search) => {
  return employees.filter((employee) => {
    if (employee.name.includes(search)) {
      return true;
    }
    if (employee.surname.includes(search)) {
      return true;
    }
  });
};

const sortEmployees = (employees) => {
  return employees.sort((a, b) => {
    if (a.surname < b.surname) {
      return -1;
    }
    return 1;
  });
};

export default function TrombiView() {
  const [search, setSearch] = React.useState("");
  const [employees, setEmployees] = React.useState([]);

  const { isDarkMode } = useDarkMode();
  React.useEffect(() => {
    getEmployees().then((data) => {
      setEmployees(data);
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={[
          styles.scrollContainer,
          { backgroundColor: isDarkMode ? colors.dark : colors.background },
        ]}
        contentContainerStyle={styles.content}
      >
        {filerEmployees(employees, search).map((employee) =>
          <TrombiCard
            key={employee.id}
            id={employee.id}
            name={employee.name}
            surname={employee.surname}
            email={employee.email}
          />
        )}
      </ScrollView>
      <TextSubmit
        isMultiLine
        submitVisible={false}
        value={search}
        onChangeText={setSearch}
        placeholder="Search"
        containerStyle={styles.form}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingTop: Const.SAFE_AREA_TOP + 88,
    paddingBottom: Const.SAFE_AREA_BOTTOM,
  },
  content: {
    paddingBottom: Const.SAFE_AREA_BOTTOM + 195,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  form: {
    position: 'absolute',
    top: Const.SAFE_AREA_TOP + 10,
  },
});
