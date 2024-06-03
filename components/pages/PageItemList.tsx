import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";

import DefaultPage from "@/components/pages/DefaultPage";
import Searchbar from "@/components/inputs/Searchbar";

import { globalStyles } from "@/constants/styles";
import workoutService from "@/constants/storage/workouts";
import {
  BaseStorageClass,
  baseStorageItem,
} from "@/constants/storage/BaseStorageClass";

interface PageItemListProps<T extends baseStorageItem> {
  callerId: string; // Unique identifier for the caller
  title: string; // title to display at the top of the page
  searchPlaceholder: string; // placeholder text for the search bar
  service: BaseStorageClass<T>; // service to get data from
  ListComponent: React.ComponentType<T & { onPress?: () => void }>; // component to render for each item
  onItemPress?: (item: T) => void; // function to call when a specific item is pressed
  FooterComponent?: React.ReactNode; // optional component to render at the bottom of the page
  seperatorHeight?: number; // height of the seperator between items
  toggleModal?: () => void; // pass a function to toggle an optional modal
}

export default function PageItemList<T extends baseStorageItem>({
  callerId,
  title,
  searchPlaceholder,
  service,
  ListComponent,
  onItemPress = () => undefined,
  seperatorHeight = 8,
  FooterComponent,
  toggleModal,
}: PageItemListProps<T>) {
  const [items, setItems] = useState(service.dataAsArray);

  useEffect(() => {
    const handleItemPress = (data: Map<string, T>) =>
      setItems(Array.from(data.values()));

    service.subscribe(callerId, handleItemPress);
    return () => workoutService.unsubscribe(callerId);
  }, [callerId, service]);

  return (
    <DefaultPage title={title} back toggleModal={toggleModal}>
      <Searchbar placeholder={searchPlaceholder} />
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={items}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <ListComponent {...item} onPress={() => onItemPress(item)} />
          )}
          ItemSeparatorComponent={() => (
            <View style={{ height: seperatorHeight }} />
          )}
        />
      </View>
      {FooterComponent}
    </DefaultPage>
  );
}
