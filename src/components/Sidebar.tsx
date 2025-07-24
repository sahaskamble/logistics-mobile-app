"use client"

import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native"
import Icon from "./Icon"

interface SidebarProps {
  isVisible: boolean
  onClose: () => void
  onNavigate: (screen: string) => void
  onLogout: () => void
}

interface MenuItem {
  id: string
  title: string
  icon: string
  hasDropdown?: boolean
  dropdownItems?: { id: string; title: string }[]
}

const Sidebar = ({ isVisible, onClose, onNavigate, onLogout }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const menuItems: MenuItem[] = [
    {
      id: "home",
      title: "Home",
      icon: "home"
    },
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "dashboard"
    },
    {
      id: "cfs",
      title: "CFS Services",
      icon: "cfs",
      hasDropdown: true,
      dropdownItems: [
        { id: "cfs-import", title: "Import Services" },
        { id: "cfs-export", title: "Export Services" },
        { id: "cfs-storage", title: "Storage Services" },
        { id: "cfs-handling", title: "Cargo Handling" }
      ]
    },
    {
      id: "transport",
      title: "Transport",
      icon: "transport",
      hasDropdown: true,
      dropdownItems: [
        { id: "transport-road", title: "Road Transport" },
        { id: "transport-rail", title: "Rail Transport" },
        { id: "transport-air", title: "Air Transport" },
        { id: "transport-sea", title: "Sea Transport" }
      ]
    },
    {
      id: "warehouse",
      title: "Warehouse",
      icon: "warehouse",
      hasDropdown: true,
      dropdownItems: [
        { id: "warehouse-storage", title: "Storage Management" },
        { id: "warehouse-inventory", title: "Inventory Control" },
        { id: "warehouse-distribution", title: "Distribution" },
        { id: "warehouse-fulfillment", title: "Order Fulfillment" }
      ]
    },
    {
      id: "3pl",
      title: "3PL",
      icon: "3pl",
      hasDropdown: true,
      dropdownItems: [
        { id: "3pl-logistics", title: "Logistics Management" },
        { id: "3pl-supply", title: "Supply Chain" },
        { id: "3pl-distribution", title: "Distribution Network" },
        { id: "3pl-consulting", title: "Consulting Services" }
      ]
    },
    {
      id: "customs",
      title: "Customs",
      icon: "customs",
      hasDropdown: true,
      dropdownItems: [
        { id: "customs-clearance", title: "Customs Clearance" },
        { id: "customs-documentation", title: "Documentation" },
        { id: "customs-compliance", title: "Compliance" },
        { id: "customs-consultation", title: "Consultation" }
      ]
    },
    {
      id: "container",
      title: "Container Management",
      icon: "container"
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: "notifications"
    },
    {
      id: "support",
      title: "Support",
      icon: "support"
    }
  ]

  const toggleDropdown = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const handleItemPress = (item: MenuItem) => {
    if (item.hasDropdown) {
      toggleDropdown(item.id)
    } else {
      onNavigate(item.id)
      onClose()
    }
  }

  const handleDropdownItemPress = (parentId: string, itemId: string) => {
    onNavigate(itemId)
    onClose()
  }

  if (!isVisible) return null

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.sidebar}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Link My Logistics</Text>
            <Text style={styles.headerSubtitle}>Navigation Menu</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Icon name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.menuItemContent}>
                  <Icon name={item.icon} size={20} color="#4A90E2" />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                {item.hasDropdown && (
                  <Icon 
                    name={expandedItems.includes(item.id) ? "chevronup" : "chevrondown"} 
                    size={16} 
                    color="#666" 
                  />
                )}
              </TouchableOpacity>

              {/* Dropdown Items */}
              {item.hasDropdown && expandedItems.includes(item.id) && (
                <View style={styles.dropdownContainer}>
                  {item.dropdownItems?.map((dropdownItem) => (
                    <TouchableOpacity
                      key={dropdownItem.id}
                      style={styles.dropdownItem}
                      onPress={() => handleDropdownItemPress(item.id, dropdownItem.id)}
                    >
                      <Text style={styles.dropdownItemText}>{dropdownItem.title}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
            <Icon name="logout" size={20} color="#F44336" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    width: 280,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#4A90E2",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
    fontWeight: "500",
  },
  dropdownContainer: {
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownItem: {
    paddingHorizontal: 55,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  logoutText: {
    fontSize: 16,
    color: "#F44336",
    marginLeft: 15,
    fontWeight: "500",
  },
})

export default Sidebar
