import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useAppAxios from "@/hooks/useAppAxios";
import { useState } from "react";

export default function Profile() {
  const axios = useAppAxios();
  const [userData, setUserData] = useState({});

  const userInfo = () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_API_URL}/api/users/me/`)
      .then((response) => {
        setUserData(response.data);
      });
  };

  userInfo();

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Profile Page</ThemedText>
      <ThemedText>{userData.username}</ThemedText>
      <ThemedText>{userData.first_name}</ThemedText>
      <ThemedText>{userData.last_name}</ThemedText>
      <ThemedText>{userData.email}</ThemedText>
    </ThemedView>
  );
}
