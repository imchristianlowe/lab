import { Button } from "react-native";

import { useSession } from "@/ctx";
import useAppAxios from "@/hooks/useAppAxios";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useForm } from "react-hook-form";
import { TextInputWrapper } from "@/components/form/TextInputWrapper";
import { SingleSelectWrapper } from "@/components/SingleSelectWrapper";

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
      <SingleSelectWrapper control={control} choices={choices} name={"label"} />
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
