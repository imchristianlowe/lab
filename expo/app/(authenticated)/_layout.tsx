import { Platform, Text, StyleSheet } from "react-native";
import { Redirect, Stack } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

import { useSession } from "@/ctx";
import { Colors } from "@/constants/Colors";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { IconSymbol } from "@/components/ui/IconSymbol";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomTabButton } from "@/components/ui/CustomTabButton";
import { is } from "@babel/types";
import { ToggleMenuButton } from "@/components/ui/ToggleMenuButton";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  function toggleExpandHandler() {
    setIsExpanded(!isExpanded);
  }

  return (
    <Tabs>
      <TabSlot />
      <TabList style={styles.tabList}>
        <TabTrigger name="home" href="/" asChild>
          <CustomTabButton icon={"home"} isExpanded={isExpanded} index={2}>
            Home
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="profile" href="/profile" asChild>
          <CustomTabButton icon={"person"} isExpanded={isExpanded} index={1}>
            Profile
          </CustomTabButton>
        </TabTrigger>
        <TabTrigger name="ticket" href="/ticket" asChild>
          <CustomTabButton icon={"ticket"} isExpanded={isExpanded} index={0}>
            Ticket
          </CustomTabButton>
        </TabTrigger>
        <ToggleMenuButton
          onPress={toggleExpandHandler}
          isExpanded={isExpanded}
        />
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabList: {
    position: "absolute",
    bottom: 32,
    right: 32,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tabTrigger: {
    flex: 1,
    borderWidth: 1,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
