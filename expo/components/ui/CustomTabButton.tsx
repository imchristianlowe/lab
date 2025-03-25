import * as React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TabTriggerSlotProps } from "expo-router/build/ui/TabTrigger";

interface CustomTabButtonProps
  extends React.PropsWithChildren,
    TabTriggerSlotProps {
  icon: keyof typeof Ionicons.glyphMap;
  isExpanded: boolean;
  index: number;
}

export const CustomTabButton = React.forwardRef<View, CustomTabButtonProps>(
  (props, ref) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const scale = useSharedValue(1);

    React.useEffect(() => {
      if (props.isExpanded) {
        translateY.value = withSpring(-80 * props.index - 80);
        opacity.value = withSpring(1);
      } else {
        translateY.value = withSpring(0);
        opacity.value = withSpring(0);
      }
    }, [props.isExpanded, props.index, translateY, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }, { scale: scale.value }],
        opacity: opacity.value,
        position: "absolute",
        bottom: 0,
        zIndex: props.index,
      };
    });

    return (
      <Animated.View style={animatedStyle}>
        <Pressable
          ref={ref}
          {...props}
          onPressIn={() => {
            scale.value = withSpring(0.9, { mass: 0.5, stiffness: 150 });
          }}
          onPressOut={() => {
            scale.value = withSpring(1, { mass: 0.5, stiffness: 150 });
          }}
          style={[styles.button, props.isFocused && styles.focusedButton]}
        >
          <Ionicons
            name={props.icon}
            size={24}
            color={props.isFocused ? "#fff" : "#64748B"}
          />
          <Text style={[styles.text, props.isFocused && styles.focusedText]}>
            {props.children}
          </Text>
        </Pressable>
      </Animated.View>
    );
  },
);

CustomTabButton.displayName = "CustomTabButton";

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32.5,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.06)",
    position: "relative",
    backgroundColor: "#fff",
  },
  focusedButton: {
    backgroundColor: "#6366F1",
  },
  focusedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  text: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
