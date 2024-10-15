import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth } from './firebaseConfig'; // adjust your firebase config path if needed
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import teen from "../img.png"; // assuming you have this image locally in assets

const SignIn = () => {
  const [showGoogleError, setShowGoogleError] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigation = useNavigation();

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      navigation.navigate("Home"); // Replace with your home screen
    } catch (e) {
      console.error(e);
      setShowGoogleError(true);
      setTimeout(() => setShowGoogleError(false), 3000); // Clear the error message after 3 seconds
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={teen} style={styles.image} />
      </View>

      <View style={styles.content}>
        {showGoogleError && (
          <Text style={styles.errorText}>
            Error with Google Sign-In. Please make sure to use your school Gmail account.
          </Text>
        )}

        <TouchableOpacity
          onPress={handleGoogleSignIn}
          style={styles.signInButton}
          disabled={googleLoading}
        >
          {googleLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signInButtonText}>Sign In with Google</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "linear-gradient(to right, #035172, #0587be)",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    width: "100%",
    padding: 20,
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },
  content: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  signInButton: {
    backgroundColor: "#3aad42",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SignIn;
