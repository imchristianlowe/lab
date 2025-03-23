import { useController } from "react-hook-form";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export const SingleSelectWrapper = ({
  choices,
  control,
  name,
  open,
  setOpen,
}) => {
  const { field } = useController({ control, defaultValue: "", name });

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
