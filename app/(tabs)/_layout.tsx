import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React from "react";
import { MyTabBar } from "@/components/ui/MyTabBar";
import { ChatIcon, HomeIcon, MenuIcon, SearchIcon } from "@/components/icons";
import { TabButton } from "@/components/ui/TabBarButton";
import { ThemedView } from "@/components/ThemedView";

const TABS = [
  { name: "home", href: "/" as const, icon: HomeIcon },
  { name: "search", href: "/search" as const, icon: SearchIcon },
  { name: "chat", href: "/chat" as const, icon: ChatIcon },
  { name: "more", href: "/more" as const, icon: MenuIcon },
];

export default function TabLayout() {
  return (
    <Tabs>
      <ThemedView style={{ flex: 1 }}>
        <TabSlot />
      </ThemedView>
      <TabList asChild>
        <MyTabBar>
          {TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton
                label={tab.name}
                options={{
                  tabBarIcon: ({ color, size }) =>
                    tab.icon ? <tab.icon color={color} size={size} /> : null,
                }}
              />
            </TabTrigger>
          ))}
        </MyTabBar>
      </TabList>
    </Tabs>
  );
}
