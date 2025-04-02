import { useRouter } from "expo-router";
import { Button, StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedTextInputWrapper } from "@/components/form/ThemedTextInputWrapper";
import { useForm } from "react-hook-form";
import useAppAxios from "@/hooks/useAppAxios";

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
      <View>
        <View width={"75%"}>
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
          <ThemedTextInputWrapper
            name={"re_password"}
            control={control}
            placeholder={"Password Again"}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title={"Sign Up"} onPress={handleSubmit(signUp)} />
          <Button
            title={"Sign In"}
            onPress={() => router.navigate("/sign-in")}
          />
        </View>
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
});
