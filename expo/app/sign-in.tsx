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
      <View style={styles.rootContainer}>
        <ThemedTextInputWrapper
          name={"username"}
          control={control}
          placeholder={"Username"}
          style={styles.input}
        />
        <ThemedTextInputWrapper
          name={"password"}
          control={control}
          placeholder={"Password"}
          secureTextEntry={true}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title={"Login"} onPress={handleSubmit(userSignIn)} />
          <Button
            title={"Sign Up"}
            onPress={() => {
              router.navigate("/sign-up");
            }}
          />
        </View>
      </View>

      {Platform.OS === "ios" && (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={
            AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE
          }
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
  button: {
    width: 200,
    height: 44,
  },
  input: {
    marginVertical: 5,
    height: 40,
    padding: 10,
  },
  buttonContainer: {
    width: "auto",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rootContainer: {
    width: Platform.OS === "web" ? "20%" : "75%",
  },
});
