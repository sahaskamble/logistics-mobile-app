"use client"

import { useState, useEffect } from "react"
import { StyleSheet, SafeAreaView, StatusBar } from "react-native"
import SplashScreen from "./src/screens/SplashScreen"
import HomeScreen from "./src/screens/HomeScreen"
import ServiceProvidersScreen from "./src/screens/ServiceProvidersScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import ProfileScreen from "./src/screens/ProfileScreen"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentScreen, setCurrentScreen] = useState("home")

  useEffect(() => {
    // Simulate splash screen loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />
      case "dashboard":
        return <DashboardScreen onNavigate={setCurrentScreen} />
      case "providers":
        return <ServiceProvidersScreen onNavigate={setCurrentScreen} />
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {isLoading ? <SplashScreen /> : renderScreen()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
})

export default App
