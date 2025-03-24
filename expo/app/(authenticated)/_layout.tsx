import { Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Redirect } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

import { useSession } from "@/ctx";
import React, { useState } from "react";
import { CustomTabButton } from "@/components/ui/CustomTabButton";
import { ToggleMenuButton } from "@/components/ui/ToggleMenuButton";
import { CustomTabList } from "@/components/ui/CustomTabList";

export default function AppLayout() {
  const { session, isLoading } = useSession();
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
    <TouchableWithoutFeedback
      onPress={() => {
        toggleExpandHandler();
      }}
    >
      <Tabs>
        <TabSlot />
        <CustomTabList />
        <TabList style={styles.tabList}>
          <TabTrigger name={"home"} href={"/"} />
          <TabTrigger name={"profile"} href={"/profile"} />
          <TabTrigger name={"ticket"} href={"/ticket"} />
        </TabList>
      </Tabs>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  tabList: {
    display: "none",
  },
});
