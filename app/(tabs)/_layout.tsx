import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { auth } from './firebaseConfig'; // Updated path to the Firebase config
import SignIn from "./SignIn"; // Import SignIn component

export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isAuthenticated) {
    return <SignIn />; // Show Sign In screen if not authenticated
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
      <Tabs.Screen
        name="todo"
        options={{
          title: "To-Do",
        }}
      />
    </Tabs>
  );
}
