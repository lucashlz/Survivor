import React from "react";
import ButtonWidgetChuckNorris from "./components/organism/ButtonWidgetChuckNorris";
import ButtonWidgetWeather from "./components/organism/ButtonWidgetWeather";
import WidgetDeepL from "./components/organism/WidgetDeepL";
import ButtonWidgetGPT from "./components/organism/ButtonWidgetGPT";
import ButtonWidgetQuote from "./components/organism/ButtonWidgetQuote";
import WidgetNews from "./components/organism/WidgetNews";

export const WIDGETS = [
  {
    key: 0,
    name: 'Artificial Intelligence (GPT)',
    comp: <ButtonWidgetGPT key={0} />,
    use: true
  },
  {
    key: 1,
    name: 'Weather Forecast',
    comp: <ButtonWidgetWeather key={1} />,
    use: true
  },
  {
    key: 2,
    name: 'Chuck Norris jokes',
    comp: <ButtonWidgetChuckNorris key={2} />,
    use: true
  },
  {
    key: 3,
    name: 'Translator (DeepL)',
    comp: <WidgetDeepL key={3} />,
    use: true
  },
  {
    key: 4,
    name: 'Quote',
    comp: <ButtonWidgetQuote key={4} />,
    use: true
  },
  {
    key: 5,
    name: 'News',
    comp: <WidgetNews key={5} />,
    use: true
  }
]
