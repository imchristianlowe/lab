import { Button, Keyboard, StatusBar } from "react-native";

import { useSession } from "@/ctx";
import useAppAxios from "@/hooks/useAppAxios";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useForm } from "react-hook-form";
import { TextInputWrapper } from "@/components/form/TextInputWrapper";
import { SingleSelectWrapper } from "@/components/form/SingleSelectWrapper";

export default function Ticket() {
  const axios = useAppAxios();

  const onSubmit = (data) => {
    axios
      .post(`${process.env.EXPO_PUBLIC_API_URL}/api/new_issue/`, data)
      .then((response) => {
        alert("Ticket created");
      })
      .catch((error) => {
        alert(JSON.stringify(error.response.data));
      });
  };

  const { control, handleSubmit } = useForm();

  const choices = [
    { label: "Feature Request", value: "enhancement" },
    { label: "UI Improvement", value: "ui improvement" },
    { label: "Bug", value: "bug" },
  ];

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Submit a Ticket</ThemedText>
      <SingleSelectWrapper control={control} choices={choices} name={"label"} />
      <TextInputWrapper
        name={"title"}
        control={control}
        placeholder={"Summary"}
      />
      <TextInputWrapper
        name={"body"}
        control={control}
        placeholder={"Longer Description"}
        blurOnSubmit={true}
        multiline
        numberOfLines={4}
        returnKeyType={"done"}
      />
      <Button
        title={"Submit"}
        type={"submit"}
        onPress={handleSubmit(onSubmit)}
      />
    </ThemedView>
  );
}
