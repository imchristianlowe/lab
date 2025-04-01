import { useRouter } from "expo-router";
import { Button, Platform, StyleSheet, View } from "react-native";

import { useSession } from "@/providers/AuthProvider";
import * as AppleAuthentication from "expo-apple-authentication";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInputWrapper } from "@/components/form/ThemedTextInputWrapper";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAppAxios from "@/hooks/useAppAxios";
import axios from "axios";

export default function SignUp() {
  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const axios = useAppAxios();

  const signUp = (data) => {
    console.log(data);
    axios
      .post(`/api/users/`, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View width={10000}>
        <ThemedTextInputWrapper
          name={"username"}
          control={control}
          placeholder={"Username"}
        />
        <ThemedTextInputWrapper
          name={"password"}
          control={control}
          placeholder={"Password"}
          secureTextEntry={true}
        />
        <ThemedTextInputWrapper
          name={"re_password"}
          control={control}
          placeholder={"Password Again"}
          secureTextEntry={true}
        />
      </View>
      <View>
        <Button title={"Sign Up"} onPress={handleSubmit(signUp)} />
        <Button title={"Sign In"} onPress={() => router.navigate("/sign-in")} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 44,
  },
});
