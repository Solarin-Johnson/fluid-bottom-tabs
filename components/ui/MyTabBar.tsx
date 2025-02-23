import { useThemeColor } from "@/hooks/useThemeColor";
import React, { forwardRef } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface MyTabBarProps {
  children: React.ReactNode;
}

export const MyTabBar = forwardRef<View, MyTabBarProps>(({ children }, ref) => {
  const { width } = useWindowDimensions();
  const wide = width > 500;
  const backgroundColor = wide
    ? useThemeColor({}, "text") + 10
    : useThemeColor({}, "background");

  const insets = useSafeAreaInsets();

  if (width)
    return (
      <Animated.View
        ref={ref}
        style={[
          styles.container,
          wide && styles.floating,
          {
            backgroundColor,
            paddingBottom: (!wide ? insets.bottom : 0) + 12,
            marginBottom: wide ? insets.bottom + 12 : 0,
          },
        ]}
      >
        {children}
      </Animated.View>
    );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  floating: {
    position: "absolute",
    bottom: 24,
    zIndex: 1,
    alignSelf: "center",
    maxWidth: 425,
    borderRadius: 50,
  },
});
