import { Button, TouchableWithoutFeedback, View } from "react-native";

import useAppAxios from "@/hooks/useAppAxios";
import { ThemedText } from "@/components/ThemedText";
import { useForm } from "react-hook-form";
import { ThemedTextInputWrapper } from "@/components/form/ThemedTextInputWrapper";
import { SingleSelectWrapper } from "@/components/form/SingleSelectWrapper";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function Ticket() {
  const axios = useAppAxios();
  const backgroundColor = useThemeColor({}, "inputBackground");

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

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
    <TouchableWithoutFeedback
      onPress={() => {
        setIsDropDownOpen(false);
      }}
    >
      <ThemedSafeAreaView style={{ flex: 1, padding: 25 }}>
        <ThemedText>Submit a Ticket</ThemedText>
        <SingleSelectWrapper
          control={control}
          choices={choices}
          name={"label"}
          open={isDropDownOpen}
          setOpen={setIsDropDownOpen}
          style={{ marginBottom: 5, marginTop: 5 }}
        />
        <ThemedTextInputWrapper
          name={"title"}
          control={control}
          placeholder={"Summary"}
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <View
          style={{
            height: 100,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "black",
            marginTop: 5,
            marginBottom: 5,
            padding: 10,
            backgroundColor,
          }}
        >
          <ThemedTextInputWrapper
            name={"body"}
            control={control}
            placeholder={"Longer Description"}
            blurOnSubmit={true}
            numberOfLines={8}
            multiline
            maxLength={40}
            returnKeyType={"done"}
            style={{ height: "100%" }}
          />
        </View>
        <Button
          title={"Submit"}
          type={"submit"}
          onPress={handleSubmit(onSubmit)}
        />
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
}
