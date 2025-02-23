import { ThemedText } from "@/components/ThemedText";
import React, { useState } from "react";
import { StyleSheet, View, Pressable, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const COLORS = ["#fa7f7c", "#b58df1", "#ffe780", "#82cab2", "#87cce8"];

interface AppProps {
  width: number;
}

export default function App({
  width = Dimensions.get("window").width,
}: AppProps) {
  const colors = width > 500 ? COLORS : COLORS.slice(0, 3);
  const [expandedId, setExpandedId] = useState(0);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.container}>
        {colors.map((color, id) => {
          return (
            <AnimatedPressable
              onPress={() => setExpandedId(id)}
              key={id}
              style={[
                styles.box,
                {
                  backgroundColor: color,
                  flexGrow: id === expandedId ? 3 : 1,
                  // highlight-next-line
                  transitionProperty: "flexGrow",
                  transitionDuration: 300,
                },
              ]}
            />
          );
        })}
      </View>
      <ThemedText style={{ textAlign: "center", width: "80%" }}>
        Click on a box to expand it. The expanded box will take up more space.
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginHorizontal: 16,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
  },
  box: {
    height: 120,
    marginVertical: 64,
  },
});
