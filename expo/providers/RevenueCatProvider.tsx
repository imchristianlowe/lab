// Provide RevenueCat functions to our app
import { createContext, useContext, useEffect, useState } from "react";
import { CustomerInfo, PurchasesPackage } from "react-native-purchases";
import { Platform } from "react-native";

// Import React Native Purchases for native platforms
let Purchases;
if (Platform.OS !== "web") {
  Purchases = require("react-native-purchases").default;
}

// For web platform, we'll use the RevenueCat JavaScript SDK
let RevenueCatWeb;
if (Platform.OS === "web") {
  // You'll need to install and import the RevenueCat JS SDK
  RevenueCatWeb = require("@revenuecat/purchases-js").Purchases;
}

const APIKeys = {
  apple: "appl_utMqkhIMipWFvYBgpmexWwQEPSp",
  google: "",
  web: "rcb_hOzlwgowTTseEtzEcbyhKwVnFmLT",
};

interface RevenueCatProps {
  purchasePackage?: (pack: PurchasesPackage) => Promise<void>;
  restorePermissions?: () => Promise<CustomerInfo>;
  user: UserState;
  packages: PurchasesPackage[];
}

export interface UserState {
  cookies: number;
  items: string[];
  pro: boolean;
}

const RevenueCatContext = createContext<RevenueCatProps | null>(null);

// Export context for easy usage
export const useRevenueCat = () => {
  return useContext(RevenueCatContext) as RevenueCatProps;
};

export const RevenueCatProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserState>({
    cookies: 0,
    items: [],
    pro: false,
  });
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === "android") {
        await Purchases.configure({ apiKey: APIKeys.google });
      } else if (Platform.OS === "ios") {
        await Purchases.configure({ apiKey: APIKeys.apple });
      } else {
        await RevenueCatWeb.configure(APIKeys.web, "something");
        Purchases = RevenueCatWeb.getSharedInstance();
      }
      setIsReady(true);

      // Load all offerings and the user object with entitlements
      await loadOfferings();
    };
    init();
  }, []);

  // Load all offerings a user can (currently) purchase
  const loadOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      setPackages(offerings.current.availablePackages);
    }
  };

  // Purchase a package
  const purchasePackage = async (pack: PurchasesPackage) => {
    try {
      await Purchases.purchasePackage(pack);
    } catch (e: any) {
      if (!e.userCancelled) {
        alert(e);
      }
    }
  };

  // // Restore previous purchases
  const restorePermissions = async () => {
    const customer = await Purchases.restorePurchases();
    return customer;
  };

  const value = {
    restorePermissions,
    user,
    packages,
    purchasePackage,
  };

  // Return empty fragment if provider is not ready (Purchase not yet initialised)
  if (!isReady) return <></>;

  return (
    <RevenueCatContext.Provider value={value}>
      {children}
    </RevenueCatContext.Provider>
  );
};
