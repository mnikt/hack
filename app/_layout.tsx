import { Stack } from 'expo-router';

export default function Layout() {
  <Stack>
    <Stack.Screen name="/app/ar" options={{ headerShown: false }} />
  </Stack>
  return <Stack />;
}

