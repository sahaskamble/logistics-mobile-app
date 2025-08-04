"use client"

import { useState, useEffect } from "react"
import { StyleSheet, SafeAreaView, StatusBar } from "react-native"
import SplashScreen from "./src/screens/SplashScreen"
import OnboardingScreen from "./src/screens/OnboardingScreen"
import SignInScreen from "./src/screens/SignInScreen"
import HomeScreen from "./src/screens/HomeScreen"
import ServiceProvidersScreen from "./src/screens/ServiceProvidersScreen"
import ServiceProviderDetailsScreen from "./src/screens/ServiceProviderDetailsScreen"
import ChatPageScreen from "./src/screens/ChatPageScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import PriorityMovementScreen from "./src/screens/PriorityMovementScreen"
import WeightmentSlipScreen from "./src/screens/WeightmentSlipScreen"
import CreateWeightmentSlipScreen from "./src/screens/CreateWeightmentSlipScreen"
import ReScanningScreen from "./src/screens/ReScanningScreen"
import CreateReScanningScreen from "./src/screens/CreateReScanningScreen"
import ContainersManagementScreen from "./src/screens/ContainersManagementScreen"
import CreateContainerScreen from "./src/screens/CreateContainerScreen"
import CreateOrderScreen from "./src/screens/CreateOrderScreen"
import MyOrdersScreen from "./src/screens/MyOrdersScreen"
import CreateNewOrderScreen from "./src/screens/CreateNewOrderScreen"
import SignUpScreen from "./src/screens/SignUpScreen"
import PricingRequestScreen from "./src/screens/PricingRequestScreen"
import { ServiceProvider } from "./src/data/serviceProviders"

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [currentScreen, setCurrentScreen] = useState("home")
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null)
  const [containers, setContainers] = useState<any[]>([]) // Store created containers

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
    setShowSignUp(false)
  }

  const handleSignUp = () => {
    setShowSignUp(false)
    setShowSignIn(false)
  }

  const handleNavigateToSignUp = () => {
    setShowSignIn(false)
    setShowSignUp(true)
  }

  const handleBackToSignIn = () => {
    setShowSignUp(false)
    setShowSignIn(true)
  }

  const handleBackToOnboarding = () => {
    setShowSignIn(false)
    setShowSignUp(false)
    setShowOnboarding(true)
  }

  const handleLogout = () => {
    setShowOnboarding(false)
    setShowSignIn(true)
    setShowSignUp(false)
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

  const handleCreateContainer = (containerData: any) => {
    // Generate a unique ID for the new container
    const newContainer = {
      ...containerData,
      id: `CON-${Date.now()}`,
    }
    setContainers(prev => [...prev, newContainer])
    setCurrentScreen("containers-management")
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
      case "chat-page":
        return <ChatPageScreen
          onNavigate={setCurrentScreen}
          onBack={() => setCurrentScreen("home")}
        />
      case "containers-management":
        return <ContainersManagementScreen
          onBack={() => setCurrentScreen("home")}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
          onCreateContainer={() => setCurrentScreen("create-container")}
          additionalContainers={containers}
        />
      case "create-container":
        return <CreateContainerScreen
          onBack={() => setCurrentScreen("containers-management")}
          onSave={handleCreateContainer}
        />
      case "create-order":
        return <CreateOrderScreen
          onBack={() => setCurrentScreen("home")}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
        />
      case "my-order":
        return <MyOrdersScreen
          onBack={() => setCurrentScreen("home")}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
        />
      case "create-new-order":
        return <CreateNewOrderScreen
          onBack={() => setCurrentScreen("my-order")}
          onSave={(orderData) => {
            console.log('Order created:', orderData)
            setCurrentScreen("my-order")
          }}
        />
      case "pricing-request":
        return <PricingRequestScreen
          onBack={() => setCurrentScreen("home")}
          onNavigate={setCurrentScreen}
          onLogout={handleLogout}
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
      ) : showSignUp ? (
        <SignUpScreen onSignUp={handleSignUp} onBackToSignIn={handleBackToSignIn} />
      ) : showSignIn ? (
        <SignInScreen
          onSignIn={handleSignIn}
          onBackToOnboarding={handleBackToOnboarding}
          onSignUp={handleNavigateToSignUp}
        />
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
