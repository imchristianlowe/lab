import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Redirect } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

import { useSession } from "@/providers/AuthProvider";
import React, { useState } from "react";
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
    return <Redirect href={"/sign-in"} />;
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
          <TabTrigger name={"subscriptions"} href={"/subscriptions"} />
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
