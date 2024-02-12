import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import TextSubmit from '../components/molecules/TextSubmit';
import { getEmployees } from '../services/api.service';
import Const from '../const';
import TrombiCard from '../components/molecules/TrombiCard';

const colors = require('../colors.json');

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

export default function SearchView() {
  const [search, setSearch] = React.useState('');
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await getEmployees();
      setEmployees(employees);
    };
    fetchEmployees();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.content}>
        <View style={styles.results}>
          {filerEmployees(employees, search).sort((a, b) => {
            if (a.surname < b.surname) {
              return -1;
            }
            return 1;
          }).map((employee) => (
            <TrombiCard
              key={employee.id}
              id={employee.id}
              name={employee.name}
              surname={employee.surname}
              email={employee.email}
            />
          ))}
        </View>
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
    height: '100%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.background
  },
  scrollContainer: {
    backgroundColor: colors.background,
    paddingTop: Const.SAFE_AREA_TOP + 84,
  },
  content: {
    paddingBottom: Const.SAFE_AREA_BOTTOM + 180,
  },
  results: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
