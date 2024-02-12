import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Const from "../../const";
import { getNews } from '../../services/apiNews.service'
import { Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LoadingSpinner from "../atoms/LoadingSpinner";

const colors = require("../../colors.json");

export default function WidgetNews() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [news, setNews] = React.useState(null);
  const [totalResults, setTotalResults] = React.useState(0);
  const [index, setIndex] = React.useState(0);

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      const data = await getNews("us");
      if (data) {
        setNews(data.data);
        setTotalResults(data.data.totalResults);
        console.log("Results: " + totalResults);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <LoadingSpinner color={colors.darkBackground} />
        ) : (
          <Text style={styles.title}>{news.articles[index].title}</Text>
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]}
          onPress={() => Linking.openURL(news.articles[index].url)}
        >
          <Text style={styles.textTitle}>
            Read more
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { borderTopRightRadius: 3, borderTopLeftRadius: 3 }]}
          onPress={() => {
            console.log(index);
            if (news[index + 1] !== null) setIndex(index + 1);
            else setIndex(0);
          }}
        >
          <Text style={styles.textTitle}>
            Next article
          </Text>
        </TouchableOpacity>
      </View>
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
    width: 170,
    height: 180,
    borderRadius: Const.BORDER_RADIUS,
    backgroundColor: colors.shadow,
    alignItems: "center",
    justifyContent: "top",
    margin: 7,
    padding: 10,
  },
  scrollContainer: {
    width: "100%",
    height: "66%",
    marginBottom: 5,
  },
  scrollContent: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    minHeight: "66%",
  },
  title: {
    fontSize: 16,
    fontFamily: Const.FONT_FAMILY,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    height: "30%",
  },
  button: {
    width: "100%",
    height: "50%",
    backgroundColor: colors.primary,
    borderRadius: Const.BORDER_RADIUS_SMALL,
    justifyContent: 'center',
    alignItems: 'center',
    justifySelf: 'top',
    margin: 1,
  },
  textTitle: {
    color: colors.lightText,
    fontSize: 13,
    fontFamily: Const.FONT_FAMILY_BOLD,
  },
});