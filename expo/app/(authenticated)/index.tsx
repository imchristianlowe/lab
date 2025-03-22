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

export default function Index() {
  const { signOut } = useSession();

  let [message, setMessage] = useState("");

  const axios = useAppAxios();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Feature Request", value: "enhancement" },
    { label: "UI Improvement", value: "ui improvement" },
    { label: "Bug", value: "bug" },
  ]);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  const { control, handleSubmit } = useForm();

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Submit a Ticket</ThemedText>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <TextInputWrapper name={"test"} control={control} />
      <TextInputWrapper name={"other"} control={control} />
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
      <ThemedText>{message}</ThemedText>
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
