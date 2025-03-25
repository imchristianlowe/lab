import * as React from "react";
import { View, StyleSheet } from "react-native";
import { TabTrigger } from "expo-router/ui";
import { ToggleMenuButton } from "./ToggleMenuButton";
import { CustomTabButton } from "./CustomTabButton";

export function CustomTabList() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  function toggleExpandHandler() {
    setIsExpanded(!isExpanded);
  }

  return (
    <View style={styles.tabList}>
      <TabTrigger name="home" href="/" asChild>
        <CustomTabButton icon={"home"} isExpanded={isExpanded} index={3}>
          Home
        </CustomTabButton>
      </TabTrigger>
      <TabTrigger name="profile" href="/profile" asChild>
        <CustomTabButton icon={"person"} isExpanded={isExpanded} index={2}>
          Profile
        </CustomTabButton>
      </TabTrigger>

      <TabTrigger name="subscriptions" href="/subscriptions" asChild>
        <CustomTabButton icon={"cash"} isExpanded={isExpanded} index={1}>
          Membership
        </CustomTabButton>
      </TabTrigger>
      <TabTrigger name="ticket" href="/ticket" asChild>
        <CustomTabButton icon={"ticket"} isExpanded={isExpanded} index={0}>
          Ticket
        </CustomTabButton>
      </TabTrigger>
      <ToggleMenuButton onPress={toggleExpandHandler} isExpanded={isExpanded} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabList: {
    bottom: 32,
    right: 32,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});
