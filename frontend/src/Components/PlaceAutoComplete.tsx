import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
  ListRenderItem,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import axios from "axios";
import debounce from "lodash.debounce";
import { Config } from "@/Config";
import { LocalizationKey, i18n } from "@/Localization";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { ITypeaheadProps } from "native-base/lib/typescript/components/composites/Typeahead/types";
import { BusStop } from "@/Store/reducers/busstops";
type SearchResult = {
  id: number;
  title: string;
  boundingbox: [string, string, string, string];
  class: string;
  display_name: string;
  icon: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
  type: string;
};

interface SearchProps {
  debounce: number | undefined;
  lang: "vn" | "en" | undefined;
  stopsData: BusStop[];
  placeSearch: boolean;
  onPress: (data: SearchResult) => void;
}

const defautlProps: SearchProps = {
  debounce: 1000,
  lang: "en",
  stopsData: [],
  placeSearch:true,
  onPress: () => {},
};

const PlaceAutocomplete = (props: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState<string | null>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [items, setItems] = useState<TAutocompleteDropdownItem[]>([
    { id: "1", title: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const handleSearch = async (text: string) => {
    try {
      let suggestion: SearchResult[] = [];
      if(props.placeSearch) {
        const response = await axios.get(
          `https://us1.locationiq.com/v1/search.php?key=${Config.MAP_API}&q=${text},VietNam&format=json`
        );
         suggestion = response.data;
      }
      suggestion = suggestion.concat(
        props.stopsData
          .filter((elem) => (elem?.label?.includes(text) ?? false))
          .map((elem) => ({
            id: parseInt(elem.id ?? ""),
            title: elem?.label?.toString() ?? "",
            boundingbox: ["", "", "", ""],
            class: "",
            display_name: elem?.value?.toString() ?? "",
            icon: "",
            importance: 0,
            lat: elem.loc.lat,
            licence: "",
            lon: elem.loc.lng,
            osm_id: "",
            osm_type: "",
            place_id: "",
            type: "",
          }))
      );
      setLoading(false);
      setResults(suggestion);
      setItems(
        suggestion.map((elem: SearchResult, index: number) => ({
          id: (index + 1).toString(),
          title: elem.display_name,
        }))
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((text) => {
        handleSearch(text);
      }, props.debounce ?? 1000), // Set debounce time (300ms in this example)
    []
  );

  const handleChangeText = (text: string) => {
    setLoading(true);
    setSearchQuery(text);
    debouncedSearch(text);
  };

  const handleSelectPlace = (place: TAutocompleteDropdownItem) => {
    if (!place) return;
    const location: SearchResult | undefined = results.find(
      (item) => item.display_name == place.title
    );
    setSearchQuery(place.title);
    setResults([]);
    console.log(location);
    
    location && props.onPress(location);
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          alwaysBounceHorizontal
          contentContainerStyle={{ margin: 0 }}
          style={styles.scrollContainer}
        >
          <View style={[styles.container]}>
            <View
              style={[
                styles.section,
                Platform.select({ ios: { zIndex: 100 } }),
              ]}
            >
              <AutocompleteDropdown
                textInputProps = {{
                  placeholder: i18n.t(LocalizationKey.ADDRESS)
                }}
                clearOnFocus={false}
                closeOnBlur={false}
                useFilter={false}
                suggestionsListMaxHeight = {300}
                onChangeText={handleChangeText}
                onSelectItem={(item) => handleSelectPlace(item)}
                dataSet={items}
                loading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {},
  container: {
    padding: 5,
  },

  section: {
    marginBottom: 1,
  },
});

PlaceAutocomplete.defaultProps = defautlProps;
export { PlaceAutocomplete, SearchResult };
