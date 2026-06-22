// app/_layout.tsx
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
    async function hideSplash() {
      await SplashScreen.hideAsync();
    }
    hideSplash();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Brackets hata diye hain taake aapke folder name se match kare */}
      <Stack.Screen name="auth" /> 
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}