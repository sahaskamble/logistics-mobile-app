"use client"

import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import Icon from "../components/Icon"

interface HomeScreenProps {
  onNavigate: (screen: string) => void
}

const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  const quickAccessItems = [
    {
      id: 1,
      title: "Priority Movement",
      subtitle: "Express handling",
      icon: "🏃",
      color: "#FFF3E0",
      iconBg: "#FF9800"
    },
    {
      id: 2,
      title: "Weightment Slip",
      subtitle: "Weight verification",
      icon: "⚖️",
      color: "#E8F5E8",
      iconBg: "#4CAF50"
    },
    {
      id: 3,
      title: "Re-scanning",
      subtitle: "Quality check",
      icon: "🔄",
      color: "#E3F2FD",
      iconBg: "#2196F3"
    },
    {
      id: 4,
      title: "Container Staging",
      subtitle: "Setup & placement",
      icon: "📦",
      color: "#F3E5F5",
      iconBg: "#9C27B0"
    }
  ]

  const recentOrders = [
    {
      id: 1,
      title: "Container #LC78452 Delivered",
      time: "Today, 10:45 AM",
      status: "delivered",
      icon: "✅"
    },
    {
      id: 2,
      title: "Shipment #SH23789 In Transit",
      time: "Yesterday, 2:30 PM",
      status: "transit",
      icon: "🚛"
    }
  ]

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="menu" size={24} color="white" />
          <View style={styles.headerContent}>
            <Text style={styles.appName}>Link LOGISTICS</Text>
            <Text style={styles.welcomeText}>Welcome, Devanshul</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="bell" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.profileImage}>
              <Icon name="user" size={20} color="white" />
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Question */}
        <View style={styles.questionSection}>
          <Text style={styles.questionText}>What would you like to manage today?</Text>
          <TouchableOpacity onPress={() => onNavigate("providers")}>
            <Text style={styles.servicesLink}>services</Text>
          </TouchableOpacity>
        </View>

        {/* Service Categories */}
        <View style={styles.servicesGrid}>
          <View style={styles.serviceRow}>
            <TouchableOpacity style={styles.serviceCard} onPress={() => onNavigate("providers")}>
              <View style={styles.serviceIcon}>
                <Icon name="truck" size={32} color="#4A90E2" />
              </View>
              <Text style={styles.serviceTitle}>Transportation</Text>
              <Text style={styles.serviceSubtitle}>Fleet management</Text>
              <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate("providers")}>
                <Text style={styles.serviceButtonText}>View services</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={() => onNavigate("providers")}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceIconText}>🏢</Text>
              </View>
              <Text style={styles.serviceTitle}>Warehouse</Text>
              <Text style={styles.serviceSubtitle}>Storage solutions</Text>
              <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate("providers")}>
                <Text style={styles.serviceButtonText}>View Services</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>

          <View style={styles.serviceRow}>
            <TouchableOpacity style={styles.serviceCard} onPress={() => onNavigate("providers")}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceIconText}>📋</Text>
              </View>
              <Text style={styles.serviceTitle}>CFS Services</Text>
              <Text style={styles.serviceSubtitle}>Container handling</Text>
              <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate("providers")}>
                <Text style={styles.serviceButtonText}>View Services</Text>
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity style={styles.serviceCard} onPress={() => onNavigate("providers")}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceIconText}>👥</Text>
              </View>
              <Text style={styles.serviceTitle}>3PL Services</Text>
              <Text style={styles.serviceSubtitle}>Logistics solutions</Text>
              <TouchableOpacity style={styles.serviceButton} onPress={() => onNavigate("providers")}>
                <Text style={styles.serviceButtonText}>View Services</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Access Section */}
        <View style={styles.quickAccessSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚡ Quick CFS Service Requests</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickAccessGrid}>
            {quickAccessItems.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.quickAccessCard, { backgroundColor: item.color }]}>
                <View style={[styles.quickAccessIcon, { backgroundColor: item.iconBg }]}>
                  <Text style={styles.quickAccessIconText}>{item.icon}</Text>
                </View>
                <Text style={styles.quickAccessTitle}>{item.title}</Text>
                <Text style={styles.quickAccessSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>See history </Text>
            </TouchableOpacity>
          </View>

          {recentOrders.map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderCard}>
              <View style={styles.orderIcon}>
                <Text style={styles.orderIconText}>{order.icon}</Text>
              </View>
              <View style={styles.orderContent}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <Text style={styles.orderTime}>{order.time}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Icon name="home" size={24} color="#4A90E2" />
          <Text style={[styles.navText, styles.activeNavText]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("dashboard")}>
          <Icon name="grid" size={24} color="#999" />
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("providers")}>
          <Icon name="truck" size={24} color="#999" />
          <Text style={styles.navText}>Provider</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => onNavigate("profile")}>
          <Icon name="user" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#4A90E2",
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContent: {
    flex: 1,
    marginLeft: 15,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  welcomeText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    marginRight: 15,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  questionSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  servicesLink: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "500",
  },
  servicesGrid: {
    paddingHorizontal: 20,
  },
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  serviceCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  serviceIconText: {
    fontSize: 32,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  serviceSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 15,
    textAlign: "center",
  },
  serviceButton: {
    backgroundColor: "#4A90E2",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  serviceButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  quickAccessSection: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  viewAllText: {
    fontSize: 14,
    color: "#4A90E2",
    fontWeight: "500",
  },
  quickAccessGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  quickAccessCard: {
    width: "48%",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  quickAccessIconText: {
    fontSize: 20,
  },
  quickAccessTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  recentOrdersSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  orderIconText: {
    fontSize: 20,
  },
  orderContent: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 12,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    alignItems: "center",
  },
  activeNavItem: {
    // Active state styling
  },
  navText: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  activeNavText: {
    color: "#4A90E2",
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#4A90E2",
    justifyContent: "center",
    alignItems: "center",
  },
})

export default HomeScreen
