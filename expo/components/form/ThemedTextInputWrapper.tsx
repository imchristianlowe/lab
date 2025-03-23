import { useController } from "react-hook-form";
import { TextInput, TextProps } from "react-native";
import { TextInputProps } from "react-native/Libraries/Components/TextInput/TextInput";
import { Control } from "react-hook-form/dist/types/form";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextInputProps = TextInputProps & {
  name: string;
  control: Control;
  lightColor?: string;
  darkColor?: string;
};

export const ThemedTextInputWrapper = ({
  name,
  control,
  lightColor,
  darkColor,
  style,
  ...rest
}: ThemedTextInputProps) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "inputBackground",
  );
  const { field } = useController({ control, defaultValue: "", name });

  return (
    <TextInput
      value={field.value}
      onChangeText={field.onChange}
      style={[{ color, backgroundColor }, style]}
      {...rest}
    />
  );
};
