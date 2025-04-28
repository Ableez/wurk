import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { services } from "../(tabs)/services";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView } from "react-native";
import Checkbox from "expo-checkbox";

const ServiceInfo = () => {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const serviceData = services.find((service) => service.id === serviceId);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  if (!serviceData) {
    return <Text>Service not found</Text>;
  }

  const handleCheckboxChange = (serviceName: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(serviceName)
        ? prevSelected.filter((name) => name !== serviceName)
        : [...prevSelected, serviceName]
    );
  };

  const totalPrice = useMemo(() => {
    const additionalServicesPrice = serviceData.additionalServices
      .filter((service) => selectedServices.includes(service.name))
      .reduce((sum, service) => sum + service.price, 0);
    return serviceData.price + additionalServicesPrice;
  }, [selectedServices, serviceData]);

  return (
    <View style={{ flex: 1 }} className="bg-white dark:bg-gray-900">
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
        <View className="p-4 flex flex-row items-center justify-between">
          <Pressable className="p-1 rounded-full active:scale-95 transition-transform duration-75 ease-in-out">
            <Ionicons size={24} name={"arrow-back"} />
          </Pressable>
          <View className="flex flex-row items-center gap-1">
            <Pressable className="p-1 rounded-full active:scale-95 transition-transform duration-75 ease-in-out">
              <Ionicons size={24} name={"share-outline"} />
            </Pressable>
            <Pressable className="p-1 rounded-full active:scale-95 transition-transform duration-75 ease-in-out">
              <Ionicons size={24} name={"ellipsis-horizontal"} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View
            style={{
              width: Dimensions.get("screen").width,
              height: Dimensions.get("screen").height / 2.5,
            }}
            className="p-2"
          >
            <Image
              source={{
                uri: serviceData.coverImageUri,
              }}
              width={800}
              height={800}
              className="w-full h-full rounded-3xl"
            />

            <Pressable className="absolute bottom-4 right-4 flex items-center justify-center rounded-full bg-white/90 w-12 h-12">
              <Ionicons name={"heart-outline"} size={24} color={"#eb0000"} />
            </Pressable>
          </View>

          <View className="p-2">
            <View className="p-4 flex flex-row items-center justify-between">
              <Text className="text-3xl font-semibold">{serviceData.name}</Text>
            </View>

            <View className="px-4">
              <View>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maxime, modi.
                </Text>
              </View>

              <View className="py-8 flex gap-2">
                <Text className="font-semibold text-gray-600 mb-2">
                  Additional services
                </Text>

                {serviceData.additionalServices.map((service, index) => (
                  <Pressable
                    className="flex flex-row items-center gap-2 w-full justify-between p-5 bg-gray-200/20 rounded-2xl active:opacity-70"
                    key={index}
                    onPress={() => handleCheckboxChange(service.name)}
                  >
                    <View className="flex flex-row items-center gap-4">
                      <View className="w-5 border"></View>
                      <Text className="text-lg font-medium">
                        {service.name} (₦{service.price})
                      </Text>
                    </View>

                    <Checkbox
                      value={selectedServices.includes(service.name)}
                      onValueChange={() => handleCheckboxChange(service.name)}
                      color={
                        selectedServices.includes(service.name)
                          ? "#3b82f6"
                          : undefined
                      }
                      style={styles.checkbox}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      <View className="bg-white dark:bg-gray-800 dark:border-gray-700 sticky bottom-2 px-6 py-2 flex flex-row items-center justify-between">
        <View className="flex flex-row justify-between items-center">
          <Pressable className="bg-blue-500 px-6 py-3 rounded-full active:bg-blue-600 w-full text-center flex flex-row items-center justify-center gap-1.5">
            <Text className="text-white text-center font-medium text-lg">
              Continue
            </Text>
            <Text className="text-xl font-semibold text-white">
              for ₦{totalPrice}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ServiceInfo;

const styles = StyleSheet.create({
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
  },
});
