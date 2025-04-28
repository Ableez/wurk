import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { usePathname } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  const pathname = usePathname();

  return (
    <Tabs>
      <TabSlot detachInactiveScreens />
      <View className={"w-full"}>
        <View className="flex flex-row justify-center bg-white">
          <TabTrigger
            name="home"
            className={`px-8  p-4 ${
              pathname === "home" ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            <Ionicons
              name={pathname === "home" ? "home" : "home"}
              size={28}
              color={pathname === "home" ? "#3b82f6" : "#444"}
            />
          </TabTrigger>

          <TabTrigger
            name="services"
            className={`px-8  p-4 ${
              pathname === "services" ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            <Ionicons
              name={pathname === "services" ? "apps" : "apps"}
              size={28}
              color={pathname === "services" ? "#3b82f6" : "#444"}
            />
          </TabTrigger>
          <TabTrigger
            name="chats"
            className={`px-8  p-4 ${
              pathname === "chats" ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            <Ionicons
              name={pathname === "chats" ? "chatbubbles" : "chatbubbles"}
              size={28}
              color={pathname === "chats" ? "#3b82f6" : "#444"}
            />
          </TabTrigger>
          <TabTrigger
            name="account"
            className={`px-8  p-4 ${
              pathname === "account" ? "bg-blue-100 border-blue-500" : ""
            }`}
          >
            <Ionicons
              name={pathname === "account" ? "person" : "person"}
              size={28}
              color={pathname === "account" ? "#3b82f6" : "#444"}
            />
          </TabTrigger>
        </View>
      </View>
      <TabList style={{ display: "none" }}>
        <TabTrigger name="home" href="/">
          <Text>Home</Text>
        </TabTrigger>
        <TabTrigger name="chats" href="/chats">
          <Text>chats</Text>
        </TabTrigger>
        <TabTrigger name="account" href="/account">
          <Text>account</Text>
        </TabTrigger>
        <TabTrigger name="services" href="/services">
          <Text>services</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}
