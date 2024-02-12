import React from 'react';
import { View, Text, RefreshControl } from 'react-native';
import { StyleSheet } from 'react-native';
import LoadingSpinner from '../components/atoms/LoadingSpinner';
import { getPersonalData } from '../services/api.service';
import { ScrollView } from 'react-native-gesture-handler';
import { useDarkMode } from '../contexts/DarkModeContext';
import Const from '../const';
import { WIDGETS, getWidgetUse } from '../widget';
import { useWidget } from '../contexts/widget.context';

const colors = require("../colors.json");

export default function HomeView() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [widgetChanged, setWidgetChanged] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userDetails, setUserDetails] = React.useState(null);
  const { isDarkMode } = useDarkMode();
  const { widgetUse, toggleWidget } = useWidget();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUserDetails();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchUserDetails = async () => {
    try {
      const data = await getPersonalData();
      if (data) {
        setUserDetails(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? colors.dark : colors.background },
        ]}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <View style={styles.content}>
            <Text
              style={{ fontSize: 27, fontWeight: "bold", fontFamily: "Retroica"}}
            >
              Hello,{" "}
              {userDetails ? userDetails.name + " " + userDetails.surname : ""}
            </Text>
            <View style={styles.widgetContainer}>
              {WIDGETS.map((widget, index) => {
                if (widget.use && widgetUse[widget.key]) {
                  return (widget.comp);
                }
              })}
            </View>
          </View>
        )}
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Const.HEADER_HEIGHT + 20,
    paddingBottom: 110,
  },
  content: {
    alignItems: "center",
    justifyContent: "top",
    paddingBottom: Const.SAFE_AREA_BOTTOM + 15,
  },
  widgetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
