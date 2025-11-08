import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Gainers',
          tabBarIcon: () => <MaterialIcons color={'green'} size={32} name={'trending-up'} />
        }}
      />
      <Tabs.Screen
        name="Loosers"
        options={{
          title: 'Loosers',
          tabBarIcon: () => <MaterialIcons color={'red'} size={32} name={'trending-down'} />,
        }}
      />
      <Tabs.Screen
        name="Calculator"
        options={{
          title: 'Calc',
          tabBarIcon: () => <MaterialIcons color={'lightblue'} size={32} name={'difference'} />,
        }}
      />
    </Tabs>
  );
}
