import { View, Text, StyleSheet, ActivityIndicator } from "react-native"

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <View style={styles.globeIcon}>
              <View style={styles.globeGrid} />
              <View style={styles.dot1} />
              <View style={styles.dot2} />
              <View style={styles.dot3} />
              <View style={styles.dot4} />
            </View>
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Link<Text style={styles.titleBlue}>My</Text>LOGISTICS
          </Text>
          <Text style={styles.subtitle}>Connecting global logistics solutions</Text>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4A90E2" />
          <Text style={styles.loadingText}>Loading your logistics world...</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F4FD",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginBottom: 40,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  globeIcon: {
    width: 60,
    height: 60,
    position: "relative",
  },
  globeGrid: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "white",
    position: "absolute",
  },
  dot1: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    position: "absolute",
    top: 10,
    left: 15,
  },
  dot2: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    position: "absolute",
    top: 20,
    right: 10,
  },
  dot3: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    position: "absolute",
    bottom: 15,
    left: 20,
  },
  dot4: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    position: "absolute",
    bottom: 10,
    right: 15,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  titleBlue: {
    color: "#4A90E2",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#666",
  },
})

export default SplashScreen
