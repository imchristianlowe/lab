import { Text, View } from "react-native";

import { useSession } from "@/ctx";
import useAppAxios from "@/hooks/useAppAxios";
import { useState } from "react";

export default function Index() {
  const { signOut } = useSession();

  let [message, setMessage] = useState("");

  const axios = useAppAxios();

  async function validateToken(): Promise<void> {
    let response = await axios.get(
      "http://localhost:8000/validate_apple_id_token/",
    );

    if (response.data) {
      setMessage(
        `${response.data.message} you are user ${response.data.user_id}`,
      );
    }
  }

  validateToken();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{ color: "red" }}
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
      <Text style={{ color: "white" }}>{message}</Text>
    </View>
  );
}
