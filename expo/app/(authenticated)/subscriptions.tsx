import { useSession } from "@/ctx";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function Subscriptions() {
  const { signOut } = useSession();

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Subscriptions Page</ThemedText>
    </ThemedView>
  );
}
