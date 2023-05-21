import React, { useMemo, useState } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, ListRenderItem } from 'react-native';
import axios from 'axios';
import debounce from "lodash.debounce"
import { Config } from '@/Config';
interface SearchResult {
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
}

interface SearchProps {
  debounce: number | undefined, 
  lang: 'vn' | "en" | undefined,
  onPress: (data:SearchResult) => void;
}

const defautlProps:SearchProps = {
  debounce: 1000,
  lang: "en",
  onPress: () => {}
}

const PlaceAutocomplete = (props:SearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async (text:string) => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${Config.MAP_API}&q=${text},VietNam&format=json&lang=${props.lang ?? "vi"}`
      );      
      setResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((text) => {
        handleSearch(text);
      }, props.debounce ?? 1000), // Set debounce time (300ms in this example)
    []
  );

  const handleChangeText = (text:string) => {
    setSearchQuery(text);
    debouncedSearch(text);
  };
    
  const handleSelectPlace = (place:SearchResult) => {
    setSearchQuery(place.display_name)
    setResults([])
    props.onPress(place)
    // Perform additional actions with the selected place
  };

  const renderPlaceItem:ListRenderItem<SearchResult> = ({item} ) => {    
    return (
      <TouchableOpacity onPress={() => handleSelectPlace(item)}>
        <Text>{item.display_name}</Text>
      </TouchableOpacity>
    );
      
  } 

  return (
    <View>
      <TextInput
        placeholder="Search for a place..."
        value={searchQuery}
        onChangeText={handleChangeText}
      />
      <FlatList<SearchResult>
        data={results}
        keyExtractor={(item:SearchResult) => item.place_id}
        renderItem={renderPlaceItem}
      />
    </View>
  );
};

PlaceAutocomplete.defaultProps = defautlProps
export {PlaceAutocomplete, SearchResult};
