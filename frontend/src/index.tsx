import React, { useEffect } from "react";
import * as Localization from "expo-localization";
import { i18n, Language } from "@/Localization";
import { NativeBaseProvider } from "native-base";
import { store, persistor } from "@/Store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ApplicationNavigator } from "./Navigation";
import { useGetStopsLocationQuery, useGetStopsQuery } from "./Services";
import { useAppDispatch } from "./Hooks/redux";
import { setStops } from "./Store/reducers/busstops";

i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = Language.VIETNAMESE;
i18n.locale = Language.VIETNAMESE;
export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ApplicationNavigator />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}

