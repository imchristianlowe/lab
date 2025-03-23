import { useController } from "react-hook-form";
import { TextInput } from "react-native";
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";
import { Control } from "react-hook-form/dist/types/form";

export const TextInputWrapper = ({
  name,
  control,
  ...textInputProps
}: {
  name: string;
  control: Control;
  textInputProps?: TextInputProps | undefined;
}) => {
  const { field } = useController({ control, defaultValue: "", name });
  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      {...textInputProps}
    />
  );
};
