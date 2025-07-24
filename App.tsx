"use client"

import { useState, useEffect } from "react"
import { StyleSheet, SafeAreaView, StatusBar } from "react-native"
import SplashScreen from "./src/screens/SplashScreen"
import OnboardingScreen from "./src/screens/OnboardingScreen"
import SignInScreen from "./src/screens/SignInScreen"
import HomeScreen from "./src/screens/HomeScreen"
import ServiceProvidersScreen from "./src/screens/ServiceProvidersScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import PriorityMovementScreen from "./src/screens/PriorityMovementScreen"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [currentScreen, setCurrentScreen] = useState("home")

  useEffect(() => {
    // Simulate splash screen loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  const handleNavigateToSignIn = () => {
    setShowOnboarding(false)
    setShowSignIn(true)
  }

  const handleSignIn = () => {
    setShowSignIn(false)
  }

  const handleBackToOnboarding = () => {
    setShowSignIn(false)
    setShowOnboarding(true)
  }

  const handleLogout = () => {
    setShowOnboarding(true)
    setShowSignIn(false)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
          onNavigateToPriorityMovement={() => setCurrentScreen("priority-movement")}
        />
      case "dashboard":
        return <DashboardScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />
      case "providers":
        return <ServiceProvidersScreen onNavigate={setCurrentScreen} />
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />
      case "priority-movement":
        return <PriorityMovementScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("home")}
        />
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      {isLoading ? (
        <SplashScreen />
      ) : showSignIn ? (
        <SignInScreen onSignIn={handleSignIn} onBackToOnboarding={handleBackToOnboarding} />
      ) : showOnboarding ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} onNavigateToSignIn={handleNavigateToSignIn} />
      ) : (
        renderScreen()
      )}
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
