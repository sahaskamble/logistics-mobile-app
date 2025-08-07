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

interface DropdownItem {
  id: string
  title: string
  hasSubDropdown?: boolean
  subDropdownItems?: { id: string; title: string }[]
}

interface MenuItem {
  id: string
  title: string
  icon: string
  hasDropdown?: boolean
  dropdownItems?: DropdownItem[]
}

const Sidebar = ({ isVisible, onClose, onNavigate, onLogout }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const [selectedItem, setSelectedItem] = useState<string>("")
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
      id: "CFS",
      title: "CFS",
      icon: "cfs",
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
        { id: "cheque-acceptance", title: "Cheque Acceptance" },
        { id: "container-staging", title: "Container Staging" },
        { id: "proforma-invoice", title: "Proforma Invoice" }
      ]
    },
    {
      id: "Warehouse",
      title: "Warehouse",
      icon: "warehouse",
      hasDropdown: true,
      dropdownItems: [
        { id: "warehouse-my-order", title: "My Order" },
        { id: "warehouse-service-request", title: "Service Request" },
        { id: "warehouse-pricing-request", title: "Pricing Request" },
        { id: "warehouse-track-trace", title: "Track & Trace" },
        { id: "warehouse-priority-movement", title: "Priority Movement" },
        { id: "warehouse-weightment-slip", title: "Weightment Slip" },
        { id: "warehouse-container-grounding", title: "Container Grounding" },
        { id: "warehouse-rescanning", title: "Re-scanning" },
        { id: "warehouse-tax-invoice", title: "Tax Invoice" },
        { id: "warehouse-eir-request", title: "EIR Request" },
        { id: "warehouse-special-equipment", title: "Special Equipment" },
        { id: "warehouse-cheque-acceptance", title: "Cheque Acceptance" },
        { id: "warehouse-container-staging", title: "Container Staging" },
        { id: "warehouse-proforma-invoice", title: "Proforma Invoice" }
      ]
    },
    {
      id: "transportation",
      title: "Transportation",
      icon: "transport",
      hasDropdown: true,
      dropdownItems: [
        { id: "transport-booking", title: "Orders" },
        { id: "vehicle-tracking", title: "Transport Movement" },
        { id: "route-planning", title: "Pricing Request" },                      
        { id: "driver-management", title: "Service Request" }
      ]
    },
    {
      id: "3pl",
      title: "3PL",
      icon: "handshake",
      hasDropdown: true,
      dropdownItems: [
        { id: "3pl-orders", title: "Orders" },
        { id: "3pl-pricing-requests", title: "Pricing Requests" },
        {
          id: "3pl-cfs",
          title: "CFS",
          hasSubDropdown: true,
          subDropdownItems: [
            { id: "3pl-cfs-my-order", title: "My Order" },
            { id: "3pl-cfs-service-request", title: "Service Request" },
            { id: "3pl-cfs-pricing-request", title: "Pricing Request" },
            { id: "3pl-cfs-track-trace", title: "Track & Trace" },
            { id: "3pl-cfs-priority-movement", title: "Priority Movement" },
            { id: "3pl-cfs-weightment-slip", title: "Weightment Slip" },
            { id: "3pl-cfs-container-grounding", title: "Container Grounding" },
            { id: "3pl-cfs-rescanning", title: "Re-scanning" },
            { id: "3pl-cfs-tax-invoice", title: "Tax Invoice" },
            { id: "3pl-cfs-eir-request", title: "EIR Request" },
            { id: "3pl-cfs-special-equipment", title: "Special Equipment" },
            { id: "3pl-cfs-cheque-acceptance", title: "Cheque Acceptance" },
            { id: "3pl-cfs-container-staging", title: "Container Staging" },
            { id: "3pl-cfs-proforma-invoice", title: "Proforma Invoice" }
          ]
        },
        {
          id: "3pl-warehouse",
          title: "Warehouse",
          hasSubDropdown: true,
          subDropdownItems: [
            { id: "3pl-warehouse-my-order", title: "My Order" },
            { id: "3pl-warehouse-service-request", title: "Service Request" },
            { id: "3pl-warehouse-pricing-request", title: "Pricing Request" },
            { id: "3pl-warehouse-track-trace", title: "Track & Trace" },
            { id: "3pl-warehouse-priority-movement", title: "Priority Movement" },
            { id: "3pl-warehouse-weightment-slip", title: "Weightment Slip" },
            { id: "3pl-warehouse-container-grounding", title: "Container Grounding" },
            { id: "3pl-warehouse-rescanning", title: "Re-scanning" },
            { id: "3pl-warehouse-tax-invoice", title: "Tax Invoice" },
            { id: "3pl-warehouse-eir-request", title: "EIR Request" },
            { id: "3pl-warehouse-special-equipment", title: "Special Equipment" },
            { id: "3pl-warehouse-cheque-acceptance", title: "Cheque Acceptance" },
            { id: "3pl-warehouse-container-staging", title: "Container Staging" },
            { id: "3pl-warehouse-proforma-invoice", title: "Proforma Invoice" }
          ]
        },
        {
          id: "3pl-transport",
          title: "Transport",
          hasSubDropdown: true,
          subDropdownItems: [
            { id: "3pl-transport-booking", title: "Orders" },
            { id: "3pl-transport-tracking", title: "Transport Movement" },
            { id: "3pl-transport-pricing", title: "Pricing Request" },
            { id: "3pl-transport-service", title: "Service Request" }
          ]
        }
      ]
    },
    {
      id: "custom",
      title: "Custom",
      icon: "container",
      hasDropdown: true,
      dropdownItems: [
        { id: "custom-orders-packages", title: "Orders Packages" },
        { id: "custom-pricing-requests", title: "Pricing Requests" },
        {
          id: "custom-cfs",
          title: "CFS",
          hasSubDropdown: true,
          subDropdownItems: [
            { id: "custom-cfs-my-order", title: "My Order" },
            { id: "custom-cfs-service-request", title: "Service Request" },
            { id: "custom-cfs-pricing-request", title: "Pricing Request" },
            { id: "custom-cfs-track-trace", title: "Track & Trace" },
            { id: "custom-cfs-priority-movement", title: "Priority Movement" },
            { id: "custom-cfs-weightment-slip", title: "Weightment Slip" },
            { id: "custom-cfs-container-grounding", title: "Container Grounding" },
            { id: "custom-cfs-rescanning", title: "Re-scanning" },
            { id: "custom-cfs-tax-invoice", title: "Tax Invoice" },
            { id: "custom-cfs-eir-request", title: "EIR Request" },
            { id: "custom-cfs-special-equipment", title: "Special Equipment" },
            { id: "custom-cfs-cheque-acceptance", title: "Cheque Acceptance" },
            { id: "custom-cfs-container-staging", title: "Container Staging" },
            { id: "custom-cfs-proforma-invoice", title: "Proforma Invoice" }
          ]
        },
        {
          id: "custom-warehouse",
          title: "Warehouse",
          hasSubDropdown: true,
          subDropdownItems: [
            { id: "custom-warehouse-my-order", title: "My Order" },
            { id: "custom-warehouse-service-request", title: "Service Request" },
            { id: "custom-warehouse-pricing-request", title: "Pricing Request" },
            { id: "custom-warehouse-track-trace", title: "Track & Trace" },
            { id: "custom-warehouse-priority-movement", title: "Priority Movement" },
            { id: "custom-warehouse-weightment-slip", title: "Weightment Slip" },
            { id: "custom-warehouse-container-grounding", title: "Container Grounding" },
            { id: "custom-warehouse-rescanning", title: "Re-scanning" },
            { id: "custom-warehouse-tax-invoice", title: "Tax Invoice" },
            { id: "custom-warehouse-eir-request", title: "EIR Request" },
            { id: "custom-warehouse-special-equipment", title: "Special Equipment" },
            { id: "custom-warehouse-cheque-acceptance", title: "Cheque Acceptance" },
            { id: "custom-warehouse-container-staging", title: "Container Staging" },
            { id: "custom-warehouse-proforma-invoice", title: "Proforma Invoice" }
          ]
        },
        {
          id: "custom-transport",
          title: "Transport",
          hasSubDropdown: true,
          subDropdownItems: [
            { id: "custom-transport-booking", title: "Orders" },
            { id: "custom-transport-tracking", title: "Transport Movement" },
            { id: "custom-transport-pricing", title: "Pricing Request" },
            { id: "custom-transport-service", title: "Service Request" }
          ]
        }
      ]
    },
    {
      id: "containers-management",
      title: "Containers Management",
      icon: "filetext"
    },
    {
      id: "notifications",
      title: "Notifications & Updates",
      icon: "notifications"
    },
    {
      id: "chat-page",
      title: "Chat Page",
      icon: "chat"
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
      setSelectedItem(item.id)
      onNavigate(item.id)
      onClose()
    }
  }

  const handleDropdownItemPress = (_parentId: string, dropdownItem: DropdownItem) => {
    if (dropdownItem.hasSubDropdown) {
      toggleDropdown(dropdownItem.id)
    } else {
      setSelectedItem(dropdownItem.id)
      onNavigate(dropdownItem.id)
      onClose()
    }
  }

  const handleSubDropdownItemPress = (_parentId: string, _subParentId: string, itemId: string) => {
    setSelectedItem(itemId)
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
        {/* Header */}
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Link My Logistics</Text>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <View key={item.id}>
              <TouchableOpacity
                style={[
                  styles.menuItem,
                  selectedItem === item.id && styles.highlightMenuItem
                ]}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.menuItemContent}>
                  <Icon
                    name={item.icon}
                    size={20}
                    color={selectedItem === item.id ? "white" : "#4A90E2"}
                  />
                  <Text style={[
                    styles.menuItemText,
                    selectedItem === item.id && styles.highlightMenuItemText
                  ]}>
                    {item.title}
                  </Text>
                </View>
                {item.hasDropdown && (
                  <Icon
                    name={expandedItems.includes(item.id) ? "chevronup" : "chevrondown"}
                    size={16}
                    color={selectedItem === item.id ? "white" : "#666"}
                  />
                )}
              </TouchableOpacity>

              {/* Dropdown Items */}
              {item.hasDropdown && expandedItems.includes(item.id) && (
                <View style={styles.dropdownContainer}>
                  {item.dropdownItems?.map((dropdownItem) => (
                    <View key={dropdownItem.id}>
                      <TouchableOpacity
                        style={[
                          styles.dropdownItem,
                          selectedItem === dropdownItem.id && styles.selectedDropdownItem
                        ]}
                        onPress={() => handleDropdownItemPress(item.id, dropdownItem)}
                      >
                        <Text style={[
                          styles.dropdownItemText,
                          selectedItem === dropdownItem.id && styles.selectedDropdownItemText
                        ]}>
                          {dropdownItem.title}
                        </Text>
                        {dropdownItem.hasSubDropdown && (
                          <Icon
                            name={expandedItems.includes(dropdownItem.id) ? "chevronup" : "chevrondown"}
                            size={14}
                            color="#666"
                          />
                        )}
                      </TouchableOpacity>

                      {/* Sub-dropdown Items */}
                      {dropdownItem.hasSubDropdown && expandedItems.includes(dropdownItem.id) && (
                        <View style={styles.subDropdownContainer}>
                          {dropdownItem.subDropdownItems?.map((subItem) => (
                            <TouchableOpacity
                              key={subItem.id}
                              style={[
                                styles.subDropdownItem,
                                selectedItem === subItem.id && styles.selectedSubDropdownItem
                              ]}
                              onPress={() => handleSubDropdownItemPress(item.id, dropdownItem.id, subItem.id)}
                            >
                              <Text style={[
                                styles.subDropdownItemText,
                                selectedItem === subItem.id && styles.selectedSubDropdownItemText
                              ]}>
                                {subItem.title}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
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
  sidebarHeader: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#4A90E2",
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
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
    backgroundColor: "#4A90E2",
    borderBottomColor: "#4A90E2",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 56,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E8E8E8",
    minHeight: 48,
  },
  selectedDropdownItem: {
    backgroundColor: "#4A90E2",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#5A6C7D",
    fontWeight: "400",
    letterSpacing: 0.2,
    flex: 1,
  },
  selectedDropdownItemText: {
    color: "white",
  },
  subDropdownContainer: {
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  subDropdownItem: {
    paddingHorizontal: 72,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E8E8E8",
    minHeight: 44,
    justifyContent: "center",
  },
  selectedSubDropdownItem: {
    backgroundColor: "#4A90E2",
  },
  subDropdownItemText: {
    fontSize: 13,
    color: "#666",
    fontWeight: "400",
    letterSpacing: 0.2,
  },
  selectedSubDropdownItemText: {
    color: "white",
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
