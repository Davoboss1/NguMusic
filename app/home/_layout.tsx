import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: Colors.secondary,
        borderTopWidth: 0
      },
      tabBarActiveTintColor: "white"
    }}>
      <Tabs.Screen
        name="(tabs)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="music" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/albums"
        options={{
          title: 'Albums',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="album" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/artists"
        options={{
          title: 'Artists',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="microphone" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="user-circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(tabs)/now_playing"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(tabs)/albums_view"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(tabs)/artists_view"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
