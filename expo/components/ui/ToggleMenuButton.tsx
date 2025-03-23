import * as React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface ToggleMenuButtonProps {
  onPress: () => void;
  isExpanded: boolean;
}

export function ToggleMenuButton(props: ToggleMenuButtonProps) {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    if (props.isExpanded) {
      rotation.value = withSpring(360, {
        damping: 12,
        stiffness: 100,
        mass: 0.6,
        velocity: 20,
      });
    } else {
      rotation.value = withSpring(0, {
        damping: 12,
        stiffness: 100,
        mass: 0.6,
        velocity: 20,
      });
    }
  }, [props.isExpanded, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotation.value}deg`,
        },
      ],
    };
  });

  return (
    <TouchableOpacity style={styles.mainButton} onPress={props.onPress}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={props.isExpanded ? "close" : "menu"}
          size={24}
          color="#fff"
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
});
