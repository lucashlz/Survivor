import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getQuote } from '../../services/apiInspirationalSentence.service';
import Const from '../../const';
import LoadingSpinner from '../atoms/LoadingSpinner';

const colors = require('../../colors.json');

export default function ButtonWidgetQuote() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [quote, setQuote] = React.useState({text: '', author: ''});
  const [quotesList, setQuotesList] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const fetchQuote = async () => {
    try {
      setIsLoading(true);
      const data = await getQuote();
      if (data && data.length > 0) {
        const filteredData = data.filter(quote => quote.author !== 'type.fit');

        if (filteredData.length > 0) {
          const cleanedAuthor = filteredData[0].author.replace(', type.fit', '');
          setQuote({text: filteredData[0].text, author: cleanedAuthor});
          setQuotesList(filteredData);
          setCurrentIndex(0);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showNextQuote = () => {
    if (currentIndex < quotesList.length - 1) {
      const newIndex = currentIndex + 1;
      const cleanedAuthor = quotesList[newIndex].author.replace(', type.fit', '');
      setQuote({text: quotesList[newIndex].text, author: cleanedAuthor});
      setCurrentIndex(newIndex);
    } else {
      const cleanedAuthor = quotesList[0].author.replace(', type.fit', '');
      setQuote({text: quotesList[0].text, author: cleanedAuthor});
      setCurrentIndex(0);
    }
  };

  React.useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <LoadingSpinner color={colors.darkBackground} />
        ) : (
          <>
            <Text style={styles.text}>{quote.text}</Text>
            <Text style={styles.authorText}>{quote.author}</Text>
          </>
        )}
      </ScrollView>
      <TouchableOpacity onPress={showNextQuote} style={styles.button}>
        <Text style={styles.textTitle}>
          More quotes
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
  authorText: {
    color: colors.darkText,
    fontSize: 14,
    fontFamily: Const.FONT_FAMILY_BOLD,
    textAlign: 'center',
    marginTop: 15,
  },
});
