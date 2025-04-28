import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

interface Service {
  id: string;
  name: string;
  iconUri: string;
}

const services: Service[] = [
  {
    id: "barber",
    name: "Barber",
    iconUri:
      "https://img.icons8.com/?size=100&id=dJXkonfxk0cw&format=png&color=000000",
  },
  {
    id: "plumbing",
    name: "Plumbing repairs",
    iconUri:
      "https://img.icons8.com/?size=100&id=xFN45rDF7HLr&format=png&color=000000",
  },
  {
    id: "hairdressing",
    name: "Hairdressing",
    iconUri:
      "https://img.icons8.com/?size=100&id=Bm1QlVLdPtDg&format=png&color=000000",
  },
  {
    id: "laundry",
    name: "Laundry & Ironing",
    iconUri:
      "https://img.icons8.com/?size=100&id=y0TbhjxK0Fz8&format=png&color=000000",
  },
  {
    id: "painting",
    name: "Home painting",
    iconUri:
      "https://img.icons8.com/?size=100&id=QUJ11XKlI1HA&format=png&color=000000",
  },
  {
    id: "electrical",
    name: "Electrical repairs",
    iconUri:
      "https://img.icons8.com/?size=100&id=HzNT76jOWDDt&format=png&color=000000",
  },
  {
    id: "decor",
    name: "Home decor",
    iconUri:
      "https://img.icons8.com/?size=100&id=20643&format=png&color=000000",
  },
  {
    id: "landscaping",
    name: "Landscaping & Gardening",
    iconUri:
      "https://img.icons8.com/?size=100&id=20643&format=png&color=000000",
  },
  {
    id: "pets",
    name: "Pets sitting",
    iconUri:
      "https://img.icons8.com/?size=100&id=20643&format=png&color=000000",
  },
  {
    id: "moving-help",
    name: "Moving help",
    iconUri:
      "https://img.icons8.com/?size=100&id=20643&format=png&color=000000",
  },
];

interface ServiceListItemProps {
  service: Service;
  index: number;
}

const ServiceListItem: React.FC<ServiceListItemProps> = React.memo(
  ({ service, index }) => {
    const enteringAnimation = FadeInDown.delay(index * 50)
      .duration(300)
      .springify()
      .damping(12);

    return (
      <Animated.View entering={enteringAnimation}>
        <Pressable
          onPress={() => router.push(`/service-info/${service.id}`)}
          className="p-5 bg-gray-200/20 dark:bg-gray-800 rounded-3xl flex flex-row items-center justify-between gap-6"
        >
          <Image
            source={{ uri: service.iconUri }}
            width={52}
            height={52}
            className="rounded-full"
          />
          <Text className="text-gray-800 flex-1 text-left text-lg font-semibold dark:text-gray-200">
            {service.name}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </Pressable>
      </Animated.View>
    );
  }
);
ServiceListItem.displayName = "ServiceListItem";

const HomeScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = React.useMemo(() => colorScheme === "dark", [colorScheme]);
  const iconColor = React.useMemo(
    () => (isDarkMode ? "#FFF" : "#000"),
    [isDarkMode]
  );

  const renderItem = React.useCallback(
    ({ item, index }: { item: Service; index: number }) => {
      return <ServiceListItem service={item} index={index} />;
    },
    []
  );

  const imageStyle = React.useMemo(
    () => ({
      tintColor: isDarkMode ? "white" : undefined,
    }),
    [isDarkMode]
  );

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <SafeAreaView style={styles.safeArea}>
        <View className="p-4 flex flex-row items-center justify-between">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white">
            Home
          </Text>
          <View className="flex flex-row items-center gap-1 ">
            <Pressable className="flex flex-row items-center gap-1 border pr-4 rounded-full p-1 pl-2 border-gray-200 dark:border-gray-700 active:scale-95 transition-transform duration-75 ease-in-out">
              <Image
                source={{
                  uri: "https://img.icons8.com/?size=100&id=18515&format=png&color=000000",
                }}
                width={28}
                height={28}
                style={imageStyle}
              />
              <Text className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                2
              </Text>
            </Pressable>
            <Pressable className="p-1 rounded-full active:scale-95 transition-transform duration-75 ease-in-out">
              <Ionicons size={24} name={"notifications"} color={iconColor} />
            </Pressable>
          </View>
        </View>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16, // Adjust padding as needed
    gap: 8, // Use gap for spacing between items
  },
  // darkIcon style is no longer needed here as tintColor is applied directly
});
