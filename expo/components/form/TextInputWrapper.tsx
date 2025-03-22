import { useController } from "react-hook-form";
import { TextInput } from "react-native";

export const TextInputWrapper = ({ name, control }) => {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={styles.input}
    />
  );
};

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
