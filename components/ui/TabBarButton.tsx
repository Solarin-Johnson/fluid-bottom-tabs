import React, { forwardRef, useState } from "react";
import { Pressable, Platform, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface TabButtonProps {
  options: {
    tabBarIcon: (props: { color: string; size: number }) => React.ReactNode;
  };
  label?: string;
  isFocused?: boolean;
  onPress?: () => void;
}

export const TabButton = forwardRef<any, TabButtonProps>(
  ({ options, label, isFocused, onPress }, ref) => {
    const text = useThemeColor({}, "text");
    const textFade = useThemeColor({}, "textFade");
    const bg = useThemeColor({}, "background");

    return (
      <AnimatedPressable
        ref={ref}
        style={[
          styles.tabBarStyle,
          {
            backgroundColor: isFocused ? text : "transparent",
            flex: isFocused ? 1 : 0.3,
            justifyContent: isFocused ? "flex-start" : "flex-end",
          },
        ]}
        onPress={onPress}
      >
        <Animated.View
          style={{
            alignItems: "center",
          }}
        >
          {options.tabBarIcon({
            color: isFocused ? bg : textFade,
            size:
              Platform.select({
                web: 32,
                ios: 36,
                android: 33,
              }) || 33,
          })}
        </Animated.View>
        <Animated.View
          style={{
            width: isFocused ? "auto" : 0,
          }}
        >
          <Animated.Text
            style={[
              styles.label,
              {
                color: bg,
                opacity: isFocused ? 1 : 0,
                transitionDuration: isFocused ? 300 : 100,
                transitionDelay: isFocused ? 100 : 0,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode={"clip"}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      </AnimatedPressable>
    );
  }
);

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 50,
    gap: "4%",
    marginHorizontal: 12,
    transitionProperty: "flex",
    transitionDuration: 300,
  },
  label: {
    transitionProperty: "opacity",
    textTransform: "capitalize",
    fontSize: 16.2,
    fontWeight: "600",
  },
});
