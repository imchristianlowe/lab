import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import Purchases, { LOG_LEVEL, PurchasesPackage } from "react-native-purchases";
import { useEffect, useState } from "react";
import React from "react";

const APIKeys = {
  apple: "appl_utMqkhIMipWFvYBgpmexWwQEPSp",
};

export default function Subscriptions() {
  const [currentOfferings, setCurrentOfferings] = useState<
    PurchasesPackage[] | undefined
  >(undefined);

  useEffect(() => {
    const setup = async () => {
      await Purchases.configure({ apiKey: APIKeys.apple });
      try {
        const offerings = await Purchases.getOfferings();
        setCurrentOfferings(offerings.current?.availablePackages);
      } catch (e) {
        console.log(`Error ${e}`);
        alert(e);
      }
    };

    Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    setup().catch(console.log);
  }, []);

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedText>Subscriptions Page</ThemedText>
      {currentOfferings?.map((pack, index) => (
        <React.Fragment key={`pack-${index}`}>
          <ThemedText>{pack.product.title}</ThemedText>
          <ThemedText>{pack.product.description}</ThemedText>
          <ThemedText>{pack.product.priceString}</ThemedText>
        </React.Fragment>
      ))}
    </ThemedView>
  );
}
