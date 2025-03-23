import { Button, Keyboard, StatusBar } from "react-native";

import { useSession } from "@/ctx";
import useAppAxios from "@/hooks/useAppAxios";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useForm } from "react-hook-form";
import { TextInputWrapper } from "@/components/form/TextInputWrapper";
import { SingleSelectWrapper } from "@/components/form/SingleSelectWrapper";

export default function Index() {
  const { signOut } = useSession();

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Home Page</ThemedText>
      <ThemedText
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </ThemedText>
    </ThemedView>
  );
}
