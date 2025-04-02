import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { PurchasesPackage } from "react-native-purchases";
import { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useRevenueCat } from "@/providers/RevenueCatProvider";

export default function Subscriptions() {
  const { user, packages, purchasePackage, restorePermissions } =
    useRevenueCat();

  const onPurchase = (pack: PurchasesPackage) => {
    // Purchase the package
    purchasePackage!(pack);
  };

  useEffect(() => {}, []);

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Subscriptions Page</ThemedText>
      {packages?.map((pack, index) => (
        <TouchableOpacity
          key={pack.identifier}
          onPress={() => onPurchase(pack)}
          style={styles.button}
        >
          <ThemedView style={styles.text}>
            <ThemedText>
              {Platform.OS === "web"
                ? pack.webBillingProduct.title
                : pack.product.title}
            </ThemedText>
            <ThemedText style={styles.desc}>
              {Platform.OS === "web"
                ? pack.webBillingProduct.description
                : pack.product.description}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.price}>
            <ThemedText>
              {Platform.OS === "web"
                ? pack.webBillingProduct.currentPrice.formattedPrice
                : pack.product.priceString}
            </ThemedText>
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginVertical: 6,
  },
  button: {
    padding: 12,
    borderRadius: 4,
    margin: 4,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
  },
  text: {
    flexGrow: 1,
  },
  desc: {
    color: "#B6B7C0",
    paddingVertical: 4,
  },
  price: {
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    borderColor: "#EA3C4A",
  },
});
