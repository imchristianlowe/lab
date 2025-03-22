import { Button, TextInput } from "react-native";

import { useSession } from "@/ctx";
import useAppAxios from "@/hooks/useAppAxios";
import { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import DropDownPicker from "react-native-dropdown-picker";
import { useController, useForm } from "react-hook-form";

const TextInputWrapper = ({ name, control }) => {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={styles.input}
    />
  );
};

const DropDownWrapper = ({ choices, control, name }) => {
  const { field } = useController({ control, defaultValue: "", name });

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState(choices);

  return (
    <DropDownPicker
      open={open}
      value={field.value}
      items={items}
      setOpen={setOpen}
      setValue={(callback: any) => field.onChange(callback())}
      setItems={setItems}
    />
  );
};

export default function Index() {
  const { signOut } = useSession();

  const axios = useAppAxios();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    axios.post("http://localhost:8000/api/new_issue/", data).catch((error) => {
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
      <DropDownWrapper control={control} choices={choices} name={"label"} />
      <TextInputWrapper name={"title"} control={control} />
      <TextInputWrapper name={"body"} control={control} />
      <Button
        title={"Submit"}
        type={"submit"}
        onPress={handleSubmit(onSubmit)}
      />
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

const styles = {
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    width: 300,
    padding: 10,
    margin: 10,
  },
};
