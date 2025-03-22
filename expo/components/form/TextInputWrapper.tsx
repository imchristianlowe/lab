import { useController } from "react-hook-form";
import { TextInput } from "react-native";

export const TextInputWrapper = ({ name, control, placeholder }) => {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={styles.input}
      placeholder={placeholder}
    />
  );
};

const styles = {
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    margin: 10,
  },
};
