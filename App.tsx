"use client"

import { useState, useEffect } from "react"
import { StyleSheet, SafeAreaView, StatusBar } from "react-native"
import SplashScreen from "./src/screens/SplashScreen"
import OnboardingScreen from "./src/screens/OnboardingScreen"
import SignInScreen from "./src/screens/SignInScreen"
import HomeScreen from "./src/screens/HomeScreen"
import ServiceProvidersScreen from "./src/screens/ServiceProvidersScreen"
import ServiceProviderDetailsScreen from "./src/screens/ServiceProviderDetailsScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import PriorityMovementScreen from "./src/screens/PriorityMovementScreen"
import WeightmentSlipScreen from "./src/screens/WeightmentSlipScreen"
import CreateWeightmentSlipScreen from "./src/screens/CreateWeightmentSlipScreen"
import ReScanningScreen from "./src/screens/ReScanningScreen"
import CreateReScanningScreen from "./src/screens/CreateReScanningScreen"
import { ServiceProvider } from "./src/data/serviceProviders"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [currentScreen, setCurrentScreen] = useState("home")
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)

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
    setShowOnboarding(false)
    setShowSignIn(true)
    setCurrentScreen("home") // Reset to home screen for next login
  }

  const handleViewProviderDetails = (provider: ServiceProvider) => {
    setSelectedProvider(provider)
    setCurrentScreen("provider-details")
  }

  const handleBackFromProviderDetails = () => {
    setSelectedProvider(null)
    setCurrentScreen("providers")
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
        return <ServiceProvidersScreen
          onNavigate={setCurrentScreen}
          onViewProviderDetails={handleViewProviderDetails}
        />
      case "provider-details":
        return selectedProvider ? (
          <ServiceProviderDetailsScreen
            provider={selectedProvider}
            onNavigate={setCurrentScreen}
            onBack={handleBackFromProviderDetails}
          />
        ) : (
          <ServiceProvidersScreen
            onNavigate={setCurrentScreen}
            onViewProviderDetails={handleViewProviderDetails}
          />
        )
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />
      case "priority-movement":
        return <PriorityMovementScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("home")}
        />
      case "weightment-slip":
        return <WeightmentSlipScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("home")}
        />
      case "create-weightment":
        return <CreateWeightmentSlipScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("weightment-slip")}
        />
      case "rescanning":
        return <ReScanningScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("home")}
        />
      case "create-rescanning":
        return <CreateReScanningScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("rescanning")}
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
