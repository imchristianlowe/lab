import { Redirect, router, useRouter } from "expo-router";
import { Button, Platform, StyleSheet, View } from "react-native";

import { useSession } from "@/providers/AuthProvider";
import * as AppleAuthentication from "expo-apple-authentication";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInputWrapper } from "@/components/form/ThemedTextInputWrapper";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignIn() {
  const { signIn } = useSession();
  const { control, handleSubmit } = useForm();
  const router = useRouter();

  const userSignIn = (data) => {
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/api/token/login/`, data)
      .then((response) => {
        signIn(response.data.auth_token);
        router.navigate("/");
      })
      .catch((error) => {
        alert(error.data);
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
      </View>
      <View>
        <Button title={"Login"} onPress={handleSubmit(userSignIn)} />
        <Button
          title={"Sign Up"}
          onPress={() => {
            router.navigate("/sign-up");
          }}
        />
      </View>

      {Platform.OS === "ios" && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              signIn(JSON.stringify(credential));
              router.replace("/");
              // signed in
            } catch (e: any) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            }
          }}
        />
      )}
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
