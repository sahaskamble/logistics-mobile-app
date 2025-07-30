"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Animated } from "react-native"
import Icon from "./Icon"

const { width: screenWidth } = Dimensions.get('window')

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
  const slideAnim = useRef(new Animated.Value(-300)).current
  const backdropAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -300,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isVisible, slideAnim, backdropAnim])

  const menuItems: MenuItem[] = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "dashboard"
    },
    {
      id: "warehouse",
      title: "Warehouse",
      icon: "warehouse",
      hasDropdown: true,
      dropdownItems: [
        { id: "my-order", title: "My Order" },
        { id: "service-request", title: "Service Request" },
        { id: "pricing-request", title: "Pricing Request" },
        { id: "track-trace", title: "Track & Trace" },
        { id: "priority-movement", title: "Priority Movement" },
        { id: "weightment-slip", title: "Weightment Slip" },
        { id: "container-grounding", title: "Container Grounding" },
        { id: "rescanning", title: "Re-scanning" },
        { id: "tax-invoice", title: "Tax Invoice" },
        { id: "eir-request", title: "EIR Request" },
        { id: "special-equipment", title: "Special Equipment" },
        { id: "job-order-update", title: "Job Order Update" },
        { id: "cheque-acceptance", title: "Cheque Acceptance" },
        { id: "container-staging", title: "Container Staging" },
        { id: "proforma-invoice", title: "Proforma Invoice" }
      ]
    },
    {
      id: "cfs",
      title: "CFS",
      icon: "cfs",
      hasDropdown: true,
      dropdownItems: [
        { id: "tariff-upload", title: "Tariff Upload" },
        { id: "cfs-import", title: "Import Services" },
        { id: "cfs-export", title: "Export Services" },
        { id: "cfs-storage", title: "Storage Services" },
        { id: "cfs-handling", title: "Cargo Handling" },
        { id: "container-inventory", title: "Container Inventory" },
        { id: "container-tracking", title: "Container Tracking" },
        { id: "container-maintenance", title: "Container Maintenance" }
      ]
    },
    {
      id: "transportation",
      title: "Transportation",
      icon: "transport",
      hasDropdown: true,
      dropdownItems: [
        { id: "transport-booking", title: "Transport Booking" },
        { id: "vehicle-tracking", title: "Vehicle Tracking" },
        { id: "route-planning", title: "Route Planning" },
        { id: "driver-management", title: "Driver Management" }
      ]
    },
    {
      id: "3pl",
      title: "3PL",
      icon: "handshake",
      hasDropdown: true,
      dropdownItems: [
        { id: "3pl-logistics", title: "Logistics Management" },
        { id: "3pl-supply", title: "Supply Chain" },
        { id: "3pl-distribution", title: "Distribution Network" }
      ]
    },
    {
      id: "customs",
      title: "Customs",
      icon: "container",
      hasDropdown: true,
      dropdownItems: [
        { id: "customs-clearance", title: "Customs Clearance" },
        { id: "documentation", title: "Documentation" },
        { id: "compliance-check", title: "Compliance Check" }
      ]
    },
    {
      id: "container-management",
      title: "Container Management",
      icon: "filetext"
    },
    {
      id: "notifications",
      title: "Notification & Updates",
      icon: "notifications"
    },
    {
      id: "profile-update",
      title: "Profile Update",
      icon: "user"
    },
    {
      id: "chat-page",
      title: "Chat Page",
      icon: "chat"
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

  const handleDropdownItemPress = (_parentId: string, itemId: string) => {
    onNavigate(itemId)
    onClose()
  }

  return (
    <View style={[styles.overlay, { display: isVisible ? 'flex' : 'none' }]}>
      <Animated.View
        style={[
          styles.backdrop,
          {
            opacity: backdropAnim,
          }
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFillObject}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }],
          }
        ]}
      >


        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  item.id === 'warehouse' && styles.highlightMenuItem
                ]}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.menuItemContent}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color={item.id === 'warehouse' ? 'white' : '#4A90E2'}
                  />
                  <Text style={[
                    styles.menuItemText,
                    item.id === 'warehouse' && styles.highlightMenuItemText
                  ]}>
                    {item.title}
                  </Text>
                </View>
                {item.hasDropdown && (
                  <Icon
                    name={expandedItems.includes(item.id) ? "chevronup" : "chevrondown"}
                    size={16}
                    color={item.id === 'warehouse' ? 'white' : '#666'}
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
      </Animated.View>
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
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: Math.min(300, screenWidth * 0.85),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 16,
    zIndex: 1001,
  },

  menuContainer: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E5E5",
    minHeight: 56,
  },
  highlightMenuItem: {
    backgroundColor: "#007AFF",
    borderBottomColor: "rgba(255, 255, 255, 0.2)",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: "#2C3E50",
    marginLeft: 16,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  highlightMenuItemText: {
    color: "white",
  },
  dropdownContainer: {
    backgroundColor: "#F8F9FA",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  dropdownItem: {
    paddingHorizontal: 56,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E8E8E8",
    minHeight: 48,
    justifyContent: "center",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#5A6C7D",
    fontWeight: "400",
    letterSpacing: 0.2,
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
