import { View, Text, StyleSheet, ActivityIndicator, Animated, Dimensions } from "react-native"
import { useEffect, useRef } from "react"
import Icon from "../components/Icon"

const { width, height } = Dimensions.get('window')

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.3)).current
  const slideAnim = useRef(new Animated.Value(50)).current

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])
  return (
    <View style={styles.container}>
      {/* Background Gradient Circles */}
      <View style={styles.backgroundCircle1} />
      <View style={styles.backgroundCircle2} />
      <View style={styles.backgroundCircle3} />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Logo Section */}
        <Animated.View style={[
          styles.logoContainer,
          {
            transform: [{ scale: scaleAnim }]
          }
        ]}>
          <View style={styles.logoCircle}>
            <View style={styles.logoInner}>
              <View style={styles.globeIcon}>
                <View style={styles.globeGrid} />
                <View style={styles.globeLine1} />
                <View style={styles.globeLine2} />
                <View style={styles.dot1} />
                <View style={styles.dot2} />
                <View style={styles.dot3} />
                <View style={styles.dot4} />
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Title Section */}
        <Animated.View style={[
          styles.titleContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}>
          <Text style={styles.title}>
            Link<Text style={styles.titleBlue}>My</Text>
            <Text style={styles.titleGradient}>LOGISTICS</Text>
          </Text>
          <Text style={styles.subtitle}>Connecting global logistics solutions</Text>
          <View style={styles.tagline}>
            <View style={styles.taglineDot} />
            <Text style={styles.taglineText}>Smart • Fast • Reliable</Text>
            <View style={styles.taglineDot} />
          </View>
        </Animated.View>

        {/* Loading Section */}
        <Animated.View style={[
          styles.loadingContainer,
          { opacity: fadeAnim }
        ]}>
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color="#4A90E2" />
          </View>
          <Text style={styles.loadingText}>Loading your logistics world...</Text>
         
         
        </Animated.View>
      </Animated.View>

      {/* Bottom Branding */}
      <Animated.View style={[styles.bottomBranding, { opacity: fadeAnim }]}>
        <Text style={styles.brandingText}>Powered by Advanced Logistics Technology</Text>
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>v2.1.0</Text>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  // Background Elements
  backgroundCircle1: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: "rgba(59, 130, 246, 0.15)",
    top: -width * 0.3,
    right: -width * 0.2,
  },
  backgroundCircle2: {
    position: "absolute",
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.3,
    backgroundColor: "rgba(147, 197, 253, 0.1)",
    bottom: -width * 0.2,
    left: -width * 0.15,
  },
  backgroundCircle3: {
    position: "absolute",
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    backgroundColor: "rgba(96, 165, 250, 0.08)",
    top: height * 0.2,
    left: width * 0.7,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logoContainer: {
    marginBottom: 60,
    position: "relative",
  },
  logoCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(147, 197, 253, 0.4)",
  },
  logoInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  globeIcon: {
    width: 70,
    height: 70,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  globeGrid: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.9)",
    position: "absolute",
  },
  globeLine1: {
    width: 70,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    top: 34,
  },
  globeLine2: {
    width: 2,
    height: 70,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    position: "absolute",
    left: 34,
  },
  dot1: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#DBEAFE",
    position: "absolute",
    top: 12,
    left: 18,
    shadowColor: "#DBEAFE",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  dot2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#93C5FD",
    position: "absolute",
    top: 22,
    right: 12,
    shadowColor: "#93C5FD",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  dot3: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#60A5FA",
    position: "absolute",
    bottom: 18,
    left: 22,
    shadowColor: "#60A5FA",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  dot4: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#3B82F6",
    position: "absolute",
    bottom: 12,
    right: 18,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 1,
  },
  titleBlue: {
    color: "#60A5FA",
  },
  titleGradient: {
    color: "#93C5FD",
    textShadowColor: "rgba(147, 197, 253, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
  tagline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  taglineDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#60A5FA",
    marginHorizontal: 8,
  },
  taglineText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    fontWeight: "500",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  loadingIndicator: {
    marginBottom: 20,
    padding: 16,
    borderRadius: 50,
    backgroundColor: "rgba(147, 197, 253, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(147, 197, 253, 0.2)",
  },
  loadingText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "400",
    marginBottom: 20,
    textAlign: "center",
  },
  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    width: "70%",
    height: "100%",
    backgroundColor: "#60A5FA",
    borderRadius: 2,
  },

  bottomBranding: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  brandingText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "300",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  versionContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(147, 197, 253, 0.2)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(147, 197, 253, 0.3)",
  },
  versionText: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
  },
})

export default SplashScreen
