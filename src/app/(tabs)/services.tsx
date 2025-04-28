import React, { useState, useMemo, useCallback } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedRef,
  FadeInDown,
} from "react-native-reanimated";

interface Service {
  id: string;
  name: string;
  iconUri: string;
  coverImageUri: string;
  price: number;
  additionalServices: { name: string; price: number }[];
}

export const services: Service[] = [
  {
    id: "barbing",
    name: "Barbing",
    iconUri:
      "https://img.icons8.com/?size=100&id=37989&format=png&color=000000",
    coverImageUri:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D",
    price: 25,
    additionalServices: [
      { name: "Facial", price: 15 },
      { name: "Hair Dying", price: 30 },
      { name: "Beard Trim", price: 10 },
    ],
  },
  {
    id: "plumbing",
    name: "Plumbing services",
    iconUri:
      "https://img.icons8.com/?size=100&id=11110&format=png&color=000000",
    coverImageUri:
      "https://images.unsplash.com/photo-1542013936693-884638332954?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGx1bWJpbmd8ZW58MHx8MHx8fDA%3D",
    price: 50,
    additionalServices: [
      { name: "Drain Cleaning", price: 40 },
      { name: "Water Heater Repair", price: 80 },
      { name: "Leak Detection", price: 60 },
    ],
  },
  {
    id: "laundry",
    name: "Laundry & Ironing",
    iconUri:
      "https://img.icons8.com/?size=100&id=y0TbhjxK0Fz8&format=png&color=000000",
    coverImageUri:
      "https://plus.unsplash.com/premium_photo-1678218580850-15c50b9f3525?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGF1bmRyeXxlbnwwfHwwfHx8MA%3D%3D",
    price: 20,
    additionalServices: [
      { name: "Dry Cleaning", price: 35 },
      { name: "Folding", price: 15 },
      { name: "Stain Removal", price: 25 },
    ],
  },
  {
    id: "painting",
    name: "Home painting",
    iconUri:
      "https://img.icons8.com/?size=100&id=QUJ11XKlI1HA&format=png&color=000000",
    coverImageUri:
      "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBwYWludGluZ3xlbnwwfDF8MHx8fDA%3D",
    price: 100,
    additionalServices: [
      { name: "Wallpapering", price: 75 },
      { name: "Texture Painting", price: 120 },
      { name: "Exterior Painting", price: 150 },
    ],
  },
  {
    id: "electrical",
    name: "Electrical repairs",
    iconUri:
      "https://img.icons8.com/?size=100&id=HzNT76jOWDDt&format=png&color=000000",
    coverImageUri:
      "https://plus.unsplash.com/premium_photo-1682086494682-caa45f271bb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG9tZSUyMGVsZWN0cmljYWx8ZW58MHwxfDB8fHww",
    price: 60,
    additionalServices: [
      { name: "Wiring Installation", price: 90 },
      { name: "Outlet Repair", price: 45 },
      { name: "Lighting Installation", price: 70 },
    ],
  },
  {
    id: "decor",
    name: "Home decor",
    iconUri:
      "https://img.icons8.com/?size=100&id=20643&format=png&color=000000",
    coverImageUri:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMGRlY29yfGVufDB8MXwwfHx8MA%3D%3D",
    price: 80,
    additionalServices: [
      { name: "Interior Design Consultation", price: 50 },
      { name: "Furniture Arrangement", price: 60 },
      { name: "Custom Art Installation", price: 150 },
    ],
  },
];

interface ServiceListItemProps {
  service: Service;
  index: number;
  onPress: (service: Service) => void;
  itemHeight: number;
}

const ServiceListItem: React.FC<ServiceListItemProps> = React.memo(
  ({ service, index, onPress, itemHeight }) => {
    const enteringAnimation = FadeInDown.delay(index * 50)
      .duration(300)
      .springify()
      .damping(12);

    const handlePress = useCallback(() => {
      onPress(service);
    }, [onPress, service]);

    const colorScheme = useColorScheme();
    const imageStyle = useMemo(
      () => ({
        tintColor: colorScheme === "dark" ? "white" : undefined,
      }),
      [colorScheme]
    );

    return (
      <Animated.View
        entering={enteringAnimation}
        style={{ height: itemHeight, width: "100%" }}
      >
        <Pressable
          onPress={handlePress}
          className="bg-gray-100/80 border border-gray-200/40 dark:bg-gray-800/80 dark:border-gray-700/50 rounded-3xl flex flex-col items-center justify-between active:opacity-70"
        >
          <View
            className="w-full flex align-middle place-items-center justify-center items-center p-1.5 relative"
            style={{ height: Dimensions.get("window").height / 1.9 }}
          >
            <Image
              source={{ uri: service.coverImageUri }}
              width={800}
              height={800}
              style={imageStyle}
              className="w-full h-full rounded-t-2xl rounded-b-xl"
            />
            <View className="flex flex-row items-center gap-1 absolute bg-indigo-400 top-4 right-4 p-1 rounded-full px-2.5 ">
              <Ionicons name={"time"} size={14} color={"#fff"} />
              <Text className="text-xs font-medium text-white">
                Arrives in 2hrs
              </Text>
            </View>
          </View>
          <View className="w-full pt-4 px-4 pb-2">
            <Text className="text-gray-800 text-left text-2xl font-semibold dark:text-gray-200 pb-2 ">
              {service.name}
            </Text>
            <Text className="text-gray-500 text-base text-left dark:text-gray-200">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              molestie.
            </Text>
          </View>

          <View className="px-4 w-full pb-4 flex items-center justify-between flex-row">
            <View className=" flex flex-row items-center gap-1">
              <Text className="text-indigo-600">Starts at</Text>
              <Text className="text-xl font-medium text-indigo-600">
                ₦2,434
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  }
);
ServiceListItem.displayName = "ServiceListItem";

const Services: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = useMemo(() => colorScheme === "dark", [colorScheme]);
  const iconColor = useMemo(() => (isDarkMode ? "#FFF" : "#444"), [isDarkMode]);

  // Calculate item height based on card content
  const cardContentHeight = Dimensions.get("window").height / 1.9 + 140; // Adjust 140 based on your card's bottom content height
  const itemHeight = cardContentHeight;

  const scrollY = useSharedValue(0);
  const flatListRef = useAnimatedRef<FlatList<Service>>();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: Service; index: number }) => (
      <ServiceListItem
        service={item}
        index={index}
        onPress={() => console.log("Pressed")}
        itemHeight={itemHeight}
      />
    ),
    [itemHeight]
  );

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View className="p-4 flex flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            Services
          </Text>
          <Pressable className="p-1 rounded-full active:scale-95 transition-transform duration-75 ease-in-out">
            <Ionicons size={24} name={"search"} color={iconColor} />
          </Pressable>
        </View>

        {/* Service List */}
        <Animated.FlatList
          ref={flatListRef}
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          className="flex-1"
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          decelerationRate={0.85}
          snapToInterval={itemHeight}
          snapToAlignment="start"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.listContentContainer,
            { height: itemHeight * services.length },
          ]}
        />
      </SafeAreaView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    gap: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    minHeight: "45%",
    width: "100%",
  },
  searchModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  searchModalView: {
    flex: 1,
    width: "100%",
  },
  searchSafeArea: {
    flex: 1,
    width: "100%",
  },
  modalViewLight: {
    backgroundColor: "#f9fafb",
  },
  modalViewDark: {
    backgroundColor: "#1f2937",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
    textAlign: "left",
  },
  modalText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  textLight: {
    color: "#1f2937",
  },
  textDark: {
    color: "#f3f4f6",
  },
  textLightMuted: {
    color: "#6b7280",
  },
  textDarkMuted: {
    color: "#9ca3af",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
  },
  searchResultsList: {
    flex: 1,
    width: "100%",
  },
  searchResultsContainer: {
    paddingBottom: 8,
  },
  searchResultText: {
    fontSize: 16,
    flex: 1,
  },
  noResultsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
