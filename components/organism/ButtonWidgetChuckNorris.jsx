import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getJoke } from '../../services/apiChuckNorris.service';
import Const from '../../const';
import LoadingSpinner from '../atoms/LoadingSpinner';

const colors = require('../../colors.json');

export default function ButtonWidgetChuckNorris() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [joke, setJoke] = React.useState(null);

  const fetchJoke = async () => {
    try {
      setIsLoading(true);
      const data = await getJoke();
      if (data) {
        setJoke(data.joke);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <LoadingSpinner color={colors.darkBackground} />
        ) : (
          <Text style={styles.text}>{joke}</Text>
        )}
      </ScrollView>
      <TouchableOpacity onPress={fetchJoke} style={styles.button}>
        <Text style={styles.textTitle}>
          More Chuck Norris
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 6,
    backgroundColor: colors.shadow,
    borderRadius: Const.BORDER_RADIUS,
    width: 170,
    height: 180,
    margin: 7,
    padding: 8,

  },
  button: {
    height:"15%",
    backgroundColor: colors.primary,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'top',
  },
  textTitle: {
    color: colors.lightText,
    fontSize: 13,
    fontFamily: Const.FONT_FAMILY_BOLD,
  },
  text: {
    color: colors.darkText,
    fontSize: 16,
    fontFamily: Const.FONT_FAMILY,
    textAlign: 'center',
  },
  scrollContainer: {
    textAlign: 'center',
    height: '85%',
    marginBottom: 5,
  },

  scrollContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 130,
  },
});
