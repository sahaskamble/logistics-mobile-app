"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Animated, Dimensions, StatusBar } from "react-native"
import Icon from "../components/Icon"

const { width, height } = Dimensions.get('window')

interface SignInScreenProps {
  onSignIn: () => void
  onBackToOnboarding: () => void
}

const SignInScreen = ({ onSignIn, onBackToOnboarding }: SignInScreenProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    // Start entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string) => {
    return password.length >= 6
  }

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear errors when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleSignIn = () => {
    // Validate form
    const newErrors = {
      email: "",
      password: "",
    }

    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)

    // If there are errors, don't proceed
    if (newErrors.email || newErrors.password) {
      return
    }

    setIsLoading(true)
    // Simulate sign in process
    setTimeout(() => {
      setIsLoading(false)
      onSignIn()
    }, 1500)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Background Elements */}
      <View style={styles.backgroundPattern}>
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.backgroundGrid} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.backButton} onPress={onBackToOnboarding}>
            <Icon name="arrow-left" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Secure Login</Text>
          <View style={styles.headerBadge}>
            <Icon name="shieldcheck" size={16} color="#3B82F6" />
          </View>
        </Animated.View>

        {/* Logo Section */}
        <Animated.View style={[
          styles.logoSection,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <View style={styles.logoInner}>
                <Icon name="truck" size={32} color="#FFFFFF" />
              </View>
              <View style={styles.logoBadge}>
                <Icon name="check" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>
          <Text style={styles.welcomeTitle}>
            Welcome to <Text style={styles.brandText}>LinkMyLogistics</Text>
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Access your logistics command center
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>99.9%</Text>
              <Text style={styles.statLabel}>Uptime</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>Global</Text>
              <Text style={styles.statLabel}>Network</Text>
            </View>
          </View>
        </Animated.View>

        {/* Form Section */}
        <Animated.View style={[
          styles.formContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <Icon name="mail" size={14} color="#3B82F6" /> Email Address
              </Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.textInput, errors.email ? styles.textInputError : null]}
                  placeholder="your.email@company.com"
                    placeholderTextColor="#6c7073ff"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => updateFormData('email', text)}
                />
                <View style={styles.inputIcon}>
                  <Icon name="user" size={18} color="#60A5FA" />
                </View>
              </View>
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                <Icon name="lock" size={14} color="#3B82F6" /> Password
              </Text>
              <View style={styles.inputWrapper}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.passwordInput, errors.password ?styles.textInputError : null]}
                    placeholder="Enter your secure password"
                    placeholderTextColor="#818385ff"
                    secureTextEntry={!showPassword}
                    value={formData.password}
                    onChangeText={(text) => updateFormData('password', text)}
                  />
                  <TouchableOpacity
                    style={styles.eyeButton}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Icon name={showPassword ? "eyeoff" : "eye"} size={18} color="#60A5FA" />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputIcon}>
                  <Icon name="shieldcheck" size={18} color="#60A5FA" />
                </View>
              </View>
              {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
            </View>

            <View style={styles.formFooter}>
              <TouchableOpacity style={styles.rememberMeContainer}>
                <View style={styles.checkbox}>
                  <Icon name="check" size={12} color="#3B82F6" />
                </View>
                <Text style={styles.rememberMeText}>Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Sign In Button */}
        <Animated.View style={[
          styles.buttonContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}>
          <TouchableOpacity
            style={[styles.signInButton, isLoading ? styles.signInButtonDisabled : null]}
            onPress={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <View style={styles.loadingSpinner} />
                <Text style={styles.signInButtonText}>Authenticating...</Text>
              </>
            ) : (
              <>
                <Icon name="dashboard" size={20} color="white" />
                <Text style={styles.signInButtonText}>Access Dashboard</Text>
                <Icon name="arrowright" size={20} color="white" />
              </>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Sign In Options */}
        <Animated.View style={[
          styles.socialContainer,
          { opacity: fadeAnim }
        ]}>
          <TouchableOpacity style={styles.socialButton}>
            <Icon name="google" size={20} color="#4285F4" />
            <Text style={styles.socialText}>Google Workspace</Text>
          </TouchableOpacity>
        </Animated.View>



        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundPattern: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backgroundCircle1: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: "rgba(59, 130, 246, 0.08)",
    top: -width * 0.3,
    right: -width * 0.2,
  },
  backgroundCircle2: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "rgba(147, 197, 253, 0.12)",
    bottom: -width * 0.1,
    left: -width * 0.2,
  },
  backgroundGrid: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.02,
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E40AF",
    letterSpacing: 0.5,
  },
  headerBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  logoContainer: {
    marginBottom: 32,
    position: "relative",
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#DBEAFE",
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  logoBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1E40AF",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  brandText: {
    color: "#3B82F6",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3B82F6",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 16,
  },
  formContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3B82F6",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    paddingLeft: 52,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#DBEAFE",
    color: "#1E40AF",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    fontWeight: "500",
  },
  textInputError: {
    borderColor: "#EF4444",
    borderWidth: 2,
    shadowColor: "#EF4444",
    shadowOpacity: 0.2,
  },
  inputIcon: {
    position: "absolute",
    left: 18,
    top: 20,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    paddingLeft: 52,
    paddingRight: 54,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#DBEAFE",
    color: "#1E40AF",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    fontWeight: "500",
  },
  eyeButton: {
    position: "absolute",
    right: 18,
    top: 20,
    padding: 4,
  },
  errorText: {
    fontSize: 12,
    color: "#EF4444",
    marginTop: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  formFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "400",
  },
  forgotPasswordButton: {
    padding: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#da6129ff",
    fontWeight: "500",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  signInButton: {
    backgroundColor: "#3B82F6",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  signInButtonDisabled: {
    backgroundColor: "#64748B",
    shadowColor: "#64748B",
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    marginHorizontal: 12,
    letterSpacing: 0.5,
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    borderTopColor: "white",
    marginRight: 12,
  },
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(74, 222, 128, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.2)",
  },
  securityText: {
    fontSize: 12,
    color: "#4ADE80",
    fontWeight: "500",
    marginLeft: 6,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontSize: 12,
    color: "#64748B",
    marginHorizontal: 16,
    fontWeight: "500",
    letterSpacing: 1,
  },
  socialContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    gap: 12,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  socialText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 18,
  },
})

export default SignInScreen
