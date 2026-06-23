import { Redirect } from 'expo-router';
import React from 'react';

export default function Index() {
  // App start hote hi pehli screen Login hogi
  return <Redirect href="/auth/login" />;
}